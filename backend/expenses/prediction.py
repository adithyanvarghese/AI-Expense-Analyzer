import google.generativeai as genai
from django.conf import settings


genai.configure(api_key=settings.GEMINI_API_KEY)


def fallback_prediction(description):

    text = description.lower()

    if any(word in text for word in [
        "uber",
        "ola",
        "taxi",
        "bus",
        "flight",
        "train",
        "petrol",
        "fuel"
    ]):
        return "Travel"

    elif any(word in text for word in [
        "pizza",
        "burger",
        "restaurant",
        "food",
        "cafe",
        "coffee",
        "swiggy",
        "zomato"
    ]):
        return "Food"

    elif any(word in text for word in [
        "amazon",
        "flipkart",
        "mall",
        "shopping",
        "cloth",
        "shirt",
        "shoe"
    ]):
        return "Shopping"

    elif any(word in text for word in [
        "hospital",
        "medicine",
        "doctor",
        "clinic",
        "pharmacy"
    ]):
        return "Medical"

    elif any(word in text for word in [
        "netflix",
        "spotify",
        "movie",
        "game",
        "steam",
        "cinema"
    ]):
        return "Entertainment"

    elif any(word in text for word in [
        "course",
        "book",
        "udemy",
        "college",
        "exam"
    ]):
        return "Education"

    elif any(word in text for word in [
        "electricity",
        "water",
        "internet",
        "wifi",
        "rent"
    ]):
        return "Bills"

    return "Others"


def predict_category(description):

    try:

        model = genai.GenerativeModel("gemini-2.5-flash")

        prompt = f"""
Predict the expense category.

Categories:

Food
Travel
Shopping
Medical
Bills
Entertainment
Education
Others

Description:

{description}

Return ONLY ONE category.
"""

        response = model.generate_content(prompt)

        category = response.text.strip()

        return category

    except Exception:

        return fallback_prediction(description)