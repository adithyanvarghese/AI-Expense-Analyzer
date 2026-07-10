import pandas as pd


def parse_csv(file):

    # Read CSV
    df = pd.read_csv(file)

    # Normalize column names
    df.columns = df.columns.str.strip().str.lower()

    transactions = []

    # =====================================================
    # Expense CSV (Exported from your application)
    # =====================================================
    if "description" in df.columns:

        for _, row in df.iterrows():

            # Handle empty category properly
            category = ""

            if "category" in df.columns:

                value = row["category"]

                if pd.notna(value):

                    category = str(value).strip()

            transactions.append({

                "date": str(row["date"]).strip(),

                "description": str(row["description"]).strip(),

                "amount": float(row["amount"]),

                "category": category

            })

        return transactions

    # =====================================================
    # Bank Statement CSV (HDFC / SBI / ICICI etc.)
    # =====================================================
    elif "narration" in df.columns:

        for _, row in df.iterrows():

            debit = row["debit"]

            # Skip income/credit transactions
            if pd.isna(debit):
                continue

            transactions.append({

                "date": str(row["date"]).strip(),

                "description": str(row["narration"]).strip(),

                "amount": float(debit),

                "category": ""

            })

        return transactions

    # =====================================================
    # Unsupported CSV
    # =====================================================
    else:

        raise ValueError("Unsupported CSV format.")