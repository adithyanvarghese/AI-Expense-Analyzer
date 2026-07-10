import os
import re
import joblib

# -----------------------------
# Load Model & Vectorizer
# -----------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))

vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))


# -----------------------------
# Text Cleaning
# -----------------------------

def clean_description(text):

    text = str(text).upper()

    replacements = {
        "SHOPPING": "SHOP",
        "PURCHASE": "SHOP",
        "ORDER": "",
        "SUBSCRIPTION": "SUB",
        "PAYMENT": "PAY",
        "ONLINE": "",
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    # Remove order numbers
    text = re.sub(r"#\d+", "", text)

    # Remove digits
    text = re.sub(r"\d+", "", text)

    # Remove special characters
    text = re.sub(r"[^A-Z ]", " ", text)

    # Remove extra spaces
    text = " ".join(text.split())

    return text


# -----------------------------
# Predict Category
# -----------------------------

def predict_category(description):

    description = clean_description(description)

    text_vector = vectorizer.transform([description])

    prediction = model.predict(text_vector)[0]

    return prediction


# -----------------------------
# Predict Category + Confidence
# -----------------------------

def predict_category_with_confidence(description):

    description = clean_description(description)

    text_vector = vectorizer.transform([description])

    prediction = model.predict(text_vector)[0]

    # Models like Logistic Regression, Naive Bayes, RandomForest
    if hasattr(model, "predict_proba"):

        probabilities = model.predict_proba(text_vector)[0]

        confidence = max(probabilities) * 100

    # LinearSVC
    elif hasattr(model, "decision_function"):

        scores = model.decision_function(text_vector)

        if scores.ndim == 1:
            confidence = 95.0
        else:
            confidence = 95.0

    else:

        confidence = 90.0

    return prediction, round(float(confidence), 2)