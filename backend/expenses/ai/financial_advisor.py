from .gemini import model


def generate_financial_advice(prompt):
    """
    Sends the prompt to Gemini and returns the AI response.
    """

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"AI Error: {str(e)}"