import os
import joblib
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)

from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET = os.path.join(BASE_DIR, "dataset", "expense_dataset.csv")

REPORT_DIR = os.path.join(BASE_DIR, "reports")

os.makedirs(REPORT_DIR, exist_ok=True)

df = pd.read_csv(DATASET)

X = df["description"]
y = df["category"]

vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

models = {

    "Logistic Regression":
        LogisticRegression(max_iter=1000),

    "Naive Bayes":
        MultinomialNB(),

    "Random Forest":
        RandomForestClassifier(
            n_estimators=150,
            random_state=42
        )
}

best_model = None
best_name = ""
best_accuracy = 0

accuracies = {}

for name, model in models.items():

    print(f"\nTraining {name}")

    model.fit(X_train, y_train)

    pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, pred)

    accuracies[name] = accuracy * 100

    print(f"Accuracy : {accuracy*100:.2f}%")

    if accuracy > best_accuracy:

        best_accuracy = accuracy
        best_model = model
        best_name = name
        best_predictions = pred

joblib.dump(best_model,
            os.path.join(BASE_DIR, "model.pkl"))

joblib.dump(vectorizer,
            os.path.join(BASE_DIR, "vectorizer.pkl"))

print("\nBest Model :", best_name)
print("Accuracy :", best_accuracy*100)

# ----------------------------------
# Classification Report
# ----------------------------------

report = classification_report(
    y_test,
    best_predictions
)

with open(
    os.path.join(REPORT_DIR,
    "classification_report.txt"),
    "w"
) as f:

    f.write(report)

print("Classification report saved.")

# ----------------------------------
# Confusion Matrix
# ----------------------------------

cm = confusion_matrix(
    y_test,
    best_predictions
)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=best_model.classes_
)

disp.plot(
    xticks_rotation=45
)

plt.tight_layout()

plt.savefig(
    os.path.join(
        REPORT_DIR,
        "confusion_matrix.png"
    )
)

plt.close()

print("Confusion matrix saved.")

# ----------------------------------
# Accuracy Graph
# ----------------------------------

plt.figure(figsize=(8,5))

plt.bar(
    accuracies.keys(),
    accuracies.values()
)

plt.ylabel("Accuracy (%)")

plt.title("ML Model Comparison")

plt.xticks(rotation=20)

plt.tight_layout()

plt.savefig(
    os.path.join(
        REPORT_DIR,
        "accuracy_comparison.png"
    )
)

plt.close()

print("Accuracy graph saved.")