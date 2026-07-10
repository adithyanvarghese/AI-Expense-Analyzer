import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)

os.makedirs(MODEL_DIR, exist_ok=True)


def next_model_name():

    files = [
        f for f in os.listdir(MODEL_DIR)
        if f.startswith("model_v")
    ]

    if not files:
        return "model_v1.pkl"

    numbers = []

    for file in files:

        version = int(
            file.replace("model_v", "")
                .replace(".pkl", "")
        )

        numbers.append(version)

    return f"model_v{max(numbers)+1}.pkl"