import os
import csv
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

# Directory path
target_dir = r"c:\Users\adith\AI-Expense-Analyzer\test_files"
os.makedirs(target_dir, exist_ok=True)

csv_path = os.path.join(target_dir, "sample_bank_statement.csv")
pdf_path = os.path.join(target_dir, "sample_bank_statement.pdf")

# =====================================================
# 1. Generate CSV Bank Statement
# =====================================================
csv_lines = [
    ["HDFC BANK ACCOUNT STATEMENT"],
    ["Account Number: 50100234567891"],
    ["Statement Period: 01-Jul-2026 to 31-Jul-2026"],
    [],
    ["Txn Date", "Narration", "Chq/Ref No", "Debit Amount", "Credit Amount", "Closing Balance"],
    ["01/07/2026", "Swiggy Food Order", "REF1001", "450.00", "", "49550.00"],
    ["02/07/2026", "Indian Oil Fuel Station", "REF1002", "1250.00", "", "48300.00"],
    ["04/07/2026", "Uber India Ride", "REF1003", "320.00", "", "47980.00"],
    ["05/07/2026", "Amazon Shopping India", "REF1004", "2499.00", "", "45481.00"],
    ["08/07/2026", "Airtel Broadband Bill", "REF1005", "999.00", "", "44482.00"],
    ["10/07/2026", "Reliance Fresh Grocery", "REF1006", "1850.50", "", "42631.50"],
    ["12/07/2026", "ATM Cash Withdrawal", "ATM502", "2000.00", "", "40631.50"],
    ["15/07/2026", "Salary Credit ACME Corp", "REF1007", "", "65000.00", "105631.50"],
    ["18/07/2026", "Netflix Premium Subscription", "REF1008", "649.00", "", "104982.50"],
    ["20/07/2026", "Zomato Restaurant Order", "REF1009", "580.00", "", "104402.50"],
    ["22/07/2026", "Zerodha SIP Mutual Fund", "REF1010", "5000.00", "", "99402.50"],
    ["25/07/2026", "Apollo Pharmacy Medical", "REF1011", "420.00", "", "98982.50"],
    ["28/07/2026", "Electricity Utility Bill", "REF1012", "1840.00", "", "97142.50"],
    ["30/07/2026", "HPCL Fuel Refill", "REF1013", "1500.00", "", "95642.50"],
]

with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(csv_lines)

print(f"Created CSV: {csv_path}")

# =====================================================
# 2. Generate PDF Bank Statement
# =====================================================
doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
story = []

styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    "DocTitle",
    parent=styles["Heading1"],
    fontSize=18,
    leading=22,
    textColor=colors.HexColor("#1E3A8A"),
    alignment=1, # Center
    spaceAfter=12,
)

subtitle_style = ParagraphStyle(
    "DocSubtitle",
    parent=styles["Normal"],
    fontSize=10,
    leading=14,
    textColor=colors.HexColor("#4B5563"),
    alignment=1,
    spaceAfter=18,
)

story.append(Paragraph("HDFC BANK STATEMENT", title_style))
story.append(Paragraph("Account Statement for July 2026 | Confidential", subtitle_style))

# Summary table
summary_data = [
    ["Account Holder", "Alex Morgan", "Statement Period", "01 Jul 2026 - 31 Jul 2026"],
    ["Account Number", "50100234567891", "Currency", "INR (Rs)"],
    ["Branch", "Central Branch", "Opening Balance", "Rs 50,000.00"],
]
summary_table = Table(summary_data, colWidths=[110, 150, 120, 150])
summary_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F3F4F6")),
    ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#1F2937")),
    ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
    ("FONTSIZE", (0, 0), (-1, -1), 9),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E7EB")),
]))
story.append(summary_table)
story.append(Spacer(1, 16))

# Transaction Table
tx_data = [
    ["Date", "Description", "Debit (Rs)", "Credit (Rs)", "Balance (Rs)"],
    ["2026-07-01", "Swiggy Food Order", "450.00", "", "49,550.00"],
    ["2026-07-02", "Indian Oil Fuel Station", "1,250.00", "", "48,300.00"],
    ["2026-07-04", "Uber India Ride", "320.00", "", "47,980.00"],
    ["2026-07-05", "Amazon Shopping India", "2,499.00", "", "45,481.00"],
    ["2026-07-08", "Airtel Broadband Bill", "999.00", "", "44,482.00"],
    ["2026-07-10", "Reliance Fresh Grocery", "1,850.50", "", "42,631.50"],
    ["2026-07-12", "ATM Cash Withdrawal", "2,000.00", "", "40,631.50"],
    ["2026-07-15", "Salary Credit ACME Corp", "", "65,000.00", "105,631.50"],
    ["2026-07-18", "Netflix Premium Subscription", "649.00", "", "104,982.50"],
    ["2026-07-20", "Zomato Restaurant Order", "580.00", "", "104,402.50"],
    ["2026-07-22", "Zerodha SIP Mutual Fund", "5,000.00", "", "99,402.50"],
    ["2026-07-25", "Apollo Pharmacy Medical", "420.00", "", "98,982.50"],
    ["2026-07-28", "Electricity Utility Bill", "1,840.00", "", "97,142.50"],
    ["2026-07-30", "HPCL Fuel Refill", "1,500.00", "", "95,642.50"],
]

tx_table = Table(tx_data, colWidths=[80, 200, 80, 80, 90])
tx_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1E3A8A")),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTSIZE", (0, 0), (-1, 0), 10),
    ("ALIGN", (2, 0), (-1, -1), "RIGHT"),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F9FAFB")]),
    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D5DB")),
]))

story.append(tx_table)
doc.build(story)

print(f"Created PDF: {pdf_path}")
