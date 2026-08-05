import io
import csv
import re
import json
from datetime import datetime, date
import pandas as pd

try:
    import pdfplumber
except ImportError:
    pdfplumber = None


# Optional Gemini import for AI statement parsing fallback
try:
    from ..ai.gemini import model as ai_model
except Exception:
    ai_model = None


# =====================================================
# Main Parser Entrypoint
# =====================================================

def parse_statement(file_obj, filename=""):
    """
    Universal parser for bank statements in CSV or PDF format.
    Returns a list of dicts:
    [{"date": "YYYY-MM-DD", "description": "...", "amount": 150.0, "category": "..."}, ...]
    """
    header_bytes = b""
    if hasattr(file_obj, "read"):
        header_bytes = file_obj.read(10)
        if hasattr(file_obj, "seek"):
            file_obj.seek(0)
    elif isinstance(file_obj, (bytes, bytearray)):
        header_bytes = bytes(file_obj)[:10]

    name = (filename or getattr(file_obj, "name", "")).lower()

    if header_bytes.startswith(b"%PDF") or name.endswith(".pdf"):
        return parse_pdf_statement(file_obj)
    else:
        return parse_csv_statement(file_obj)


# Legacy compatibility alias
def parse_csv(file_obj):
    return parse_statement(file_obj)


# =====================================================
# CSV Parsing Engine
# =====================================================

def parse_csv_statement(file_obj):
    # Read raw bytes
    if hasattr(file_obj, "read"):
        content = file_obj.read()
        if hasattr(file_obj, "seek"):
            file_obj.seek(0)
    else:
        content = file_obj

    # Check for PDF magic bytes
    if isinstance(content, (bytes, bytearray)) and content.startswith(b"%PDF"):
        return parse_pdf_statement(file_obj)

    if isinstance(content, str):
        text_content = content
    else:
        # Try multiple encodings
        text_content = None
        for encoding in ["utf-8-sig", "utf-8", "latin-1", "cp1252"]:
            try:
                text_content = content.decode(encoding)
                break
            except Exception:
                continue

    if not text_content:
        raise ValueError("Could not decode CSV file.")

    # Parse lines using Python's native csv.reader to bypass C tokenizer issues
    raw_lines = [line.strip() for line in text_content.splitlines() if line.strip()]
    if not raw_lines:
        return []

    parsed_rows = []
    for line in raw_lines:
        try:
            delimiter = ","
            if "\t" in line and line.count("\t") > line.count(","):
                delimiter = "\t"
            elif ";" in line and line.count(";") > line.count(","):
                delimiter = ";"
            row = next(csv.reader([line], delimiter=delimiter))
            if row:
                parsed_rows.append([cell.strip() for cell in row])
        except Exception:
            continue

    if not parsed_rows:
        return []

    header_idx = -1
    best_score = -1

    for idx, row in enumerate(parsed_rows[:30]):
        if len(row) < 2:
            continue
        row_str = " ".join(row).lower()

        has_date = any(k in row_str for k in ["date", "txn", "transaction", "value", "post", "time"])
        has_desc = any(k in row_str for k in ["description", "narration", "particulars", "details", "remarks", "payee", "memo", "name"])
        has_amt = any(k in row_str for k in ["amount", "debit", "withdrawal", "dr", "credit", "deposit", "balance", "amt"])

        keywords_matched = sum([has_date, has_desc, has_amt])
        col_count = len(row)

        if keywords_matched >= 1:
            score = (keywords_matched * 10) + col_count
            if score > best_score:
                best_score = score
                header_idx = idx

    if header_idx == -1:
        for idx, row in enumerate(parsed_rows):
            if len(row) >= 2:
                header_idx = idx
                break

    if header_idx == -1 or header_idx >= len(parsed_rows) - 1:
        headers = [f"col_{i}" for i in range(len(parsed_rows[0]))]
        data_rows = parsed_rows
    else:
        headers = parsed_rows[header_idx]
        data_rows = parsed_rows[header_idx + 1:]

    num_cols = len(headers)
    normalized_data = []
    for r in data_rows:
        if len(r) == num_cols:
            normalized_data.append(r)
        elif len(r) > num_cols:
            normalized_data.append(r[:num_cols])
        elif len(r) > 0 and len(r) < num_cols:
            padded = r + [""] * (num_cols - len(r))
            normalized_data.append(padded)

    df = pd.DataFrame(normalized_data, columns=headers)
    transactions = parse_dataframe_transactions(df)

    # Fallback to AI if 0 transactions extracted and AI model is available
    if not transactions and ai_model:
        transactions = parse_with_ai(text_content[:4000])

    return transactions


# =====================================================
# DataFrame Column Mapping & Normalization
# =====================================================

def parse_dataframe_transactions(df):
    if df.empty:
        return []

    # Clean column names
    df.columns = [str(col).strip().lower() for col in df.columns]

    date_col = None
    desc_col = None
    debit_col = None
    credit_col = None
    amount_col = None
    category_col = None

    for col in df.columns:
        if not date_col and any(k in col for k in ["txn date", "transaction date", "value date", "post date", "tran date", "date"]):
            date_col = col
        elif not desc_col and any(k in col for k in ["description", "narration", "particulars", "details", "remarks", "payee", "memo"]):
            desc_col = col
        elif not debit_col and any(k in col for k in ["debit", "withdrawal", "dr amount", "dr", "debit(inr)"]):
            debit_col = col
        elif not credit_col and any(k in col for k in ["credit", "deposit", "cr amount", "cr", "credit(inr)"]):
            credit_col = col
        elif not amount_col and any(k in col for k in ["amount", "amt", "txn amount"]):
            amount_col = col
        elif not category_col and any(k in col for k in ["category", "type"]):
            category_col = col

    # Fallbacks if strict matching missed
    if not date_col and len(df.columns) > 0:
        date_col = df.columns[0]
    if not desc_col and len(df.columns) > 1:
        desc_col = df.columns[1]

    transactions = []

    for _, row in df.iterrows():
        raw_date = row.get(date_col)
        raw_desc = row.get(desc_col)

        if pd.isna(raw_date) or pd.isna(raw_desc):
            continue

        clean_d = clean_date_str(str(raw_date))
        clean_desc = re.sub(r"[^\w\s\-\&]", "", str(raw_desc)).strip()

        if not clean_d or not clean_desc or clean_desc.lower() in ["total", "balance", "opening balance", "nan", "null", "date"]:
            continue

        # Extract amount logic
        amt = 0.0
        is_expense = True

        if debit_col and pd.notna(row.get(debit_col)):
            val = row.get(debit_col)
            parsed_amt = clean_numeric(val)
            if parsed_amt > 0:
                amt = parsed_amt
                is_expense = True

        if amt <= 0 and amount_col and pd.notna(row.get(amount_col)):
            val_str = str(row.get(amount_col)).upper()
            parsed_amt = clean_numeric(val_str)
            if "CR" in val_str and "DR" not in val_str:
                is_expense = False
            elif parsed_amt < 0:
                amt = abs(parsed_amt)
                is_expense = True
            else:
                amt = parsed_amt
                is_expense = True

        if amt <= 0 and credit_col and pd.notna(row.get(credit_col)):
            parsed_amt = clean_numeric(row.get(credit_col))
            if parsed_amt > 0:
                amt = parsed_amt
                is_expense = False

        if amt <= 0:
            continue

        category = ""
        if category_col and pd.notna(row.get(category_col)):
            cat_val = str(row.get(category_col)).strip()
            if cat_val.lower() not in ["nan", "null", "none"]:
                category = cat_val

        # If credit/income and no specific category set
        if not is_expense and not category:
            category = "Income"

        transactions.append({
            "date": clean_d,
            "description": clean_desc,
            "amount": round(float(amt), 2),
            "category": category,
        })

    return transactions


# =====================================================
# PDF Parsing Engine
# =====================================================

def parse_pdf_statement(file_obj):
    if not pdfplumber:
        raise ValueError("PDF parsing requires pdfplumber. Please check backend dependencies.")

    if hasattr(file_obj, "read"):
        content = file_obj.read()
        if hasattr(file_obj, "seek"):
            file_obj.seek(0)
        pdf_file = io.BytesIO(content)
    else:
        pdf_file = file_obj

    transactions = []
    extracted_text_pages = []

    try:
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                if text:
                    extracted_text_pages.append(text)

                # Try table extraction first
                tables = page.extract_tables()
                for table in tables:
                    if not table or len(table) < 1:
                        continue

                    # Check if first cell looks like a date (headerless table on page 2, 3...)
                    first_cell = str(table[0][0] or "").strip()
                    is_data_row = bool(re.match(r"^\d{4}-\d{2}-\d{2}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}[-\s][A-Za-z]{3}[-\s]\d{2,4}", first_cell))

                    if is_data_row:
                        num_cols = len(table[0])
                        if num_cols == 5:
                            cols = ["date", "description", "debit", "credit", "balance"]
                        elif num_cols == 4:
                            cols = ["date", "description", "amount", "balance"]
                        else:
                            cols = [f"col_{i}" for i in range(num_cols)]
                        df_table = pd.DataFrame(table, columns=cols)
                    else:
                        if len(table) < 2:
                            continue
                        headers = [str(cell or "").strip() for cell in table[0]]
                        df_table = pd.DataFrame(table[1:], columns=headers)

                    parsed_rows = parse_dataframe_transactions(df_table)
                    transactions.extend(parsed_rows)
    except Exception as e:
        print("PDF table extraction warning:", e)

    # If table extraction yielded transactions, return them
    if transactions:
        return transactions

    # Regex line-by-line fallback parsing from PDF text
    full_pdf_text = "\n".join(extracted_text_pages)
    transactions = parse_text_lines(full_pdf_text)

    # AI Fallback if text line parsing yielded 0 transactions
    if not transactions and ai_model and full_pdf_text.strip():
        transactions = parse_with_ai(full_pdf_text[:4000])

    return transactions


# =====================================================
# Regex Text Line Parser
# =====================================================

def parse_text_lines(text):
    transactions = []
    lines = [line.strip() for line in text.splitlines() if line.strip()]

    # Pattern: Date (DD/MM/YYYY or DD-MMM-YYYY or YYYY-MM-DD), Description, Amount
    date_pattern = r"(\d{4}-\d{2}-\d{2}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}[-\s][A-Za-z]{3}[-\s]\d{2,4})"
    amount_pattern = r"([^\s\d]?\s*[\d,]+\.\d{2}\s*(?:Dr|Cr)?)"

    for line in lines:
        date_match = re.search(date_pattern, line)
        if not date_match:
            continue

        raw_date = date_match.group(1)
        clean_d = clean_date_str(raw_date)

        if not clean_d:
            continue

        # Find amounts in line
        amounts = re.findall(amount_pattern, line, re.IGNORECASE)
        if not amounts:
            continue

        clean_amt = clean_numeric(amounts[0])
        if clean_amt <= 0:
            continue

        # Extract description text strictly between date and first amount
        date_end = date_match.end()
        amt_match = re.search(re.escape(amounts[0]), line[date_end:])
        if amt_match:
            desc = line[date_end : date_end + amt_match.start()].strip()
        else:
            desc = line[date_end:].strip()

        # Clean description of any bullet symbols or unicode noise
        desc = re.sub(r"[^\w\s\-\&]", "", desc).strip()

        if len(desc) < 2 or any(w in desc.lower() for w in ["balance", "total", "opening", "currency", "statement", "date"]):
            continue

        transactions.append({
            "date": clean_d,
            "description": desc,
            "amount": round(float(clean_amt), 2),
            "category": "",
        })

    return transactions


# =====================================================
# Helper Utilities
# =====================================================

def clean_numeric(val):
    if val is None or pd.isna(val):
        return 0.0
    s = str(val).strip()

    # Strip any characters except digits, period, comma, minus, and Dr/Cr
    cleaned = re.sub(r"[^\d\.\,\-A-Za-z]", "", s)
    cleaned_upper = cleaned.upper().replace(",", "")
    cleaned_upper = cleaned_upper.replace("DR", "").replace("CR", "").strip()

    try:
        return abs(float(cleaned_upper))
    except Exception:
        match = re.search(r"[\d\.]+", cleaned_upper)
        if match:
            try:
                return float(match.group(0))
            except Exception:
                return 0.0
        return 0.0


def clean_date_str(val):
    if not val or pd.isna(val):
        return ""

    s = str(val).strip()

    # Common date formats
    formats = [
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%d-%m-%Y",
        "%d-%b-%Y",
        "%d/%m/%y",
        "%d-%m-%y",
        "%m/%d/%Y",
        "%b %d, %Y",
    ]

    for fmt in formats:
        try:
            dt = datetime.strptime(s, fmt)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            continue

    # Try pandas to_datetime
    try:
        dt = pd.to_datetime(s, dayfirst=True)
        if pd.notna(dt):
            return dt.strftime("%Y-%m-%d")
    except Exception:
        pass

    return str(date.today())


# =====================================================
# AI Statement Fallback
# =====================================================

def parse_with_ai(statement_text):
    if not ai_model:
        return []

    prompt = f"""
You are an expert AI Bank Statement Parser.

Extract all expense/debit transactions from this bank statement text.

Return ONLY a valid JSON array of objects.

JSON Format:
[
  {{
    "date": "YYYY-MM-DD",
    "description": "Merchant or Description",
    "amount": 150.0,
    "category": ""
  }}
]

Bank Statement Text:
{statement_text}
"""
    try:
        response = ai_model.generate_content(prompt)
        text = response.text.strip()
        text = text.replace("```json", "").replace("```", "").strip()
        data = json.loads(text)
        if isinstance(data, list):
            valid_transactions = []
            for item in data:
                amt = clean_numeric(item.get("amount"))
                if amt > 0:
                    valid_transactions.append({
                        "date": clean_date_str(item.get("date")),
                        "description": str(item.get("description", "Expense")).strip(),
                        "amount": round(float(amt), 2),
                        "category": str(item.get("category", "")).strip(),
                    })
            return valid_transactions
    except Exception as e:
        print("AI Statement Parser Error:", e)

    return []