import google.generativeai as genai
from django.conf import settings

genai.configure(api_key=settings.GEMINI_API_KEY)


def parse_receipt(text):

    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"""
You are an expense parser.

Extract:

Merchant
Date
Amount
Category
Description

Return ONLY JSON.

Receipt:

{text}
"""

    response = model.generate_content(prompt)

    return response.text