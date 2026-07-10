import os
import pandas as pd
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET = os.path.join(
    BASE_DIR,
    "dataset",
    "expense_dataset.csv"
)

FEEDBACK = os.path.join(
    BASE_DIR,
    "feedback",
    "feedback_dataset.csv"
)


def retrain_if_needed():

    if not os.path.exists(FEEDBACK):
        print("Feedback file not found.")
        return

    feedback = pd.read_csv(FEEDBACK)

    if len(feedback) < 100:

        print(f"Only {len(feedback)} feedback samples.")
        print("Need at least 100.")

        return

    dataset = pd.read_csv(DATASET)

    merged = pd.concat(
        [dataset, feedback],
        ignore_index=True
    )

    merged.to_csv(DATASET, index=False)

    print("Dataset updated.")

    subprocess.run(
        ["python", "train_model.py"],
        cwd=BASE_DIR
    )

    feedback.iloc[0:0].to_csv(
        FEEDBACK,
        index=False
    )

    print("Feedback cleared.")