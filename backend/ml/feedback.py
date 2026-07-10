import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET = os.path.join(
    BASE_DIR,
    "feedback",
    "feedback_dataset.csv"
)

def save_feedback(description, category):

    row = pd.DataFrame([{
        "description": description,
        "category": category
    }])

    if os.path.exists(DATASET):

        row.to_csv(
            DATASET,
            mode="a",
            index=False,
            header=False
        )

    else:

        row.to_csv(
            DATASET,
            index=False
        )

    return True