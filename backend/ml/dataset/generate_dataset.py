import random
import pandas as pd

categories = {

    "Food": [
        "SWIGGY ORDER",
        "ZOMATO PAYMENT",
        "DOMINOS PIZZA",
        "PIZZA HUT",
        "BURGER KING",
        "KFC INDIA",
        "MCDONALDS",
        "SUBWAY",
        "STARBUCKS",
        "CAFE COFFEE DAY"
    ],

    "Travel": [
        "UBER TRIP",
        "OLA CAB",
        "RAPIDO",
        "METRO RECHARGE",
        "KSRTC",
        "IRCTC",
        "FLIGHT BOOKING",
        "BUS TICKET"
    ],

    "Shopping": [
        "AMAZON PAY",
        "FLIPKART",
        "MYNTRA",
        "AJIO",
        "CROMA",
        "RELIANCE DIGITAL",
        "NIKE STORE",
        "PUMA"
    ],

    "Entertainment": [
        "NETFLIX",
        "SPOTIFY",
        "BOOKMYSHOW",
        "HOTSTAR",
        "AMAZON PRIME",
        "YOUTUBE PREMIUM"
    ],

    "Bills": [
        "ELECTRICITY BILL",
        "WATER BILL",
        "MOBILE RECHARGE",
        "JIO RECHARGE",
        "AIRTEL",
        "BROADBAND BILL"
    ],

    "Healthcare": [
        "APOLLO PHARMACY",
        "MEDICAL STORE",
        "LAB TEST",
        "HOSPITAL",
        "DENTAL CLINIC"
    ],

    "Fuel": [
        "INDIAN OIL",
        "HP PETROL",
        "SHELL PETROL",
        "BHARAT PETROLEUM"
    ],

    "Investment": [
        "MUTUAL FUND SIP",
        "STOCK PURCHASE",
        "NPS",
        "PPF",
        "ZERODHA"
    ],

    "Salary": [
        "SALARY CREDIT",
        "MONTHLY SALARY",
        "BONUS CREDIT"
    ],

    "Others": [
        "ATM WITHDRAWAL",
        "BANK CHARGE",
        "CHEQUE PAYMENT",
        "CASH WITHDRAWAL"
    ]
}

suffixes = [
    "",
    " #1234",
    " KOCHI",
    " BANGALORE",
    " ONLINE",
    " POS",
    " UPI",
    " TXN",
    " PAYMENT",
    " STORE",
    " INDIA"
]

rows = []

for _ in range(10000):

    category = random.choice(list(categories.keys()))

    desc = random.choice(categories[category])

    desc += random.choice(suffixes)

    rows.append({
        "description": desc,
        "category": category
    })

df = pd.DataFrame(rows)

df.to_csv("expense_dataset.csv", index=False)

print("Generated", len(df), "transactions")
print(df.head())