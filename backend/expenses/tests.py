import io
from django.test import TestCase
from expenses.services.statement_parser import parse_statement, clean_numeric, clean_date_str
from ml.keyword_classifier import classify_by_keyword


class StatementParserTests(TestCase):
    def test_clean_numeric(self):
        self.assertEqual(clean_numeric("1,250.50"), 1250.50)
        self.assertEqual(clean_numeric("₹ 500.00 Dr"), 500.00)
        self.assertEqual(clean_numeric("$ 1,000.25"), 1000.25)
        self.assertEqual(clean_numeric("-350.75"), 350.75)
        self.assertEqual(clean_numeric("■4,225.81"), 4225.81)

    def test_clean_date_str(self):
        self.assertEqual(clean_date_str("2026-07-01"), "2026-07-01")
        self.assertEqual(clean_date_str("15/01/2026"), "2026-01-15")
        self.assertEqual(clean_date_str("15-Jan-2026"), "2026-01-15")

    def test_keyword_classification(self):
        self.assertEqual(classify_by_keyword("Fuel"), "Fuel")
        self.assertEqual(classify_by_keyword("Restaurant"), "Food")
        self.assertEqual(classify_by_keyword("Utility Bill"), "Bills")
        self.assertEqual(classify_by_keyword("Online Purchase"), "Shopping")
        self.assertEqual(classify_by_keyword("Grocery"), "Grocery")

    def test_parse_real_bank_csv(self):
        csv_data = """HDFC Bank Statement for A/C 123456789
Period: 01/07/2026 to 10/07/2026

Txn Date,Narration,Chq/Ref No,Debit Amount,Credit Amount,Closing Balance
01/07/2026,Swiggy Food Order,REF101,"520.00",,10000.00
02/07/2026,Uber India Ride,REF102,"180.00",,9820.00
03/07/2026,Salary Deposit,REF103,,"50000.00",59820.00
"""
        csv_file = io.BytesIO(csv_data.encode("utf-8"))
        transactions = parse_statement(csv_file, "statement.csv")

        self.assertEqual(len(transactions), 3)
        self.assertEqual(transactions[0]["description"], "Swiggy Food Order")
        self.assertEqual(transactions[0]["amount"], 520.00)
        self.assertEqual(transactions[0]["date"], "2026-07-01")
        self.assertEqual(transactions[1]["description"], "Uber India Ride")
        self.assertEqual(transactions[1]["amount"], 180.00)
        self.assertEqual(transactions[2]["description"], "Salary Deposit")
        self.assertEqual(transactions[2]["amount"], 50000.00)
        self.assertEqual(transactions[2]["category"], "Income")
