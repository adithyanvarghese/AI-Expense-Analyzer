import json
from datetime import date

from .gemini import model

from ml.predict import predict_category_with_confidence


def analyze_receipt(receipt_text):
    """
    Analyze receipt text using Gemini AI and always return
    a valid Expense object structure.
    """

    prompt = f"""
You are an AI receipt analyzer.

Extract the expense information from this receipt.

Return ONLY valid JSON.

JSON format:

{{
    "merchant": "",
    "date": "YYYY-MM-DD",
    "amount": 0,
    "category": "",
    "description": ""
}}

Allowed Categories:
Food
Travel
Shopping
Bills
Entertainment
Healthcare
Education
Fuel
Grocery
Others

Receipt:

{receipt_text}
"""

    try:

        response = model.generate_content(prompt)

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        data = json.loads(text)

    except Exception as e:

        print("Receipt Analyzer Error:", e)

        data = {}

    valid_categories = [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Healthcare",
        "Education",
        "Fuel",
        "Grocery",
        "Others",
    ]

    amount = data.get("amount", 0)

    try:
        amount = float(amount)
    except:
        amount = 0

    category = str(data.get("category", "Others")).title()

    if category not in valid_categories:
        category = "Others"

    description = (
        data.get("description")
        or data.get("merchant")
        or "Receipt Expense"
    )

    predicted_category, confidence = predict_category_with_confidence(
        description
    )

    if confidence >= 80:
        final_category = predicted_category
    else:
        final_category = "Others"

    receipt = {
        "date": data.get("date") or str(date.today()),
        "description": description,
        "category": final_category,
        "amount": amount
    }

    print("=" * 60)
    print("Description :", description)
    print("Gemini Category :", data.get("category"))
    print("ML Prediction :", predicted_category)
    print("Confidence :", confidence)
    print("Final Category :", final_category)
    print("=" * 60)

    return receipt