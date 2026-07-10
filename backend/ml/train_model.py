import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report

from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier

import re

def clean_description(text):

    text = str(text).upper()

    text = re.sub(r"#\d+", "", text)

    text = re.sub(r"\d+", "", text)

    text = re.sub(r"[^A-Z ]", " ", text)

    text = " ".join(text.split())

    return text

# -------------------------
# Load Dataset
# -------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET = os.path.join(BASE_DIR, "dataset", "expense_dataset.csv")

df = pd.read_csv(DATASET)

from preprocess import preprocess_description

df["description"] = df["description"].apply(preprocess_description)

X = df["description"].apply(clean_description)
y = df["category"]

# -------------------------
# TF-IDF
# -------------------------

vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(X)

# -------------------------
# Train Test Split
# -------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -------------------------
# Models
# -------------------------

models = {

    "Logistic Regression":
        LogisticRegression(max_iter=1000),

    "Naive Bayes":
        MultinomialNB(),

    "Random Forest":
        RandomForestClassifier(
            n_estimators=200,
            random_state=42
        )
}

best_model = None
best_accuracy = 0
best_name = ""

print("=" * 70)

for name, model in models.items():

    print(f"\nTraining {name}...")

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"Accuracy: {accuracy * 100:.2f}%")

    print(classification_report(y_test, predictions))

    if accuracy > best_accuracy:

        best_accuracy = accuracy
        best_model = model
        best_name = name

print("\n" + "=" * 70)

print(f"Best Model: {best_name}")

print(f"Accuracy : {best_accuracy * 100:.2f}%")

# -------------------------
# Save Best Model
# -------------------------

from versioning import next_model_name

MODEL_NAME = next_model_name()

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    MODEL_NAME
)

joblib.dump(best_model, MODEL_PATH)

print(f"Saved as {MODEL_NAME}")

# Save versioned model
joblib.dump(best_model, MODEL_PATH)

# Save latest model
joblib.dump(
    best_model,
    os.path.join(BASE_DIR, "model.pkl")
)

joblib.dump(
    vectorizer,
    os.path.join(BASE_DIR, "vectorizer.pkl")
)

print("Latest model saved.")