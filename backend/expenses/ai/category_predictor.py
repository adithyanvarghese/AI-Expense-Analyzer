from .gemini import model


def categorize_transaction(description):
    """
    Uses Gemini AI to predict the category of a transaction.
    """

    prompt = f"""
You are an AI financial assistant.

Categorize the following bank transaction into ONLY one of these categories:

- Food
- Travel
- Shopping
- Bills
- Entertainment
- Healthcare
- Education
- Fuel
- Salary
- Investment
- Grocery
- Others

Transaction:
{description}

Rules:
- Return ONLY the category name.
- Do not explain.
- Do not write a sentence.
"""

    try:
        response = model.generate_content(prompt)

        category = response.text.strip()

        allowed_categories = [
            "Food",
            "Travel",
            "Shopping",
            "Bills",
            "Entertainment",
            "Healthcare",
            "Education",
            "Fuel",
            "Salary",
            "Investment",
            "Grocery",
            "Others",
        ]

        if category in allowed_categories:
            return category

        return "Others"

    except Exception as e:

        print("Category Prediction Error:", e)

        return "Others"