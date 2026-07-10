import re

def preprocess_description(text):

    text = text.lower()

    text = re.sub(r'\d+', ' ', text)

    text = re.sub(r'[^a-zA-Z ]', ' ', text)

    text = " ".join(text.split())

    return text