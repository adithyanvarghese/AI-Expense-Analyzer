import os
import shutil
import pytesseract
from PIL import Image

# Dynamic Tesseract binary path detection (Windows vs Linux / Docker / Render)
custom_cmd = os.getenv("TESSERACT_CMD", r"C:\Program Files\Tesseract-OCR\tesseract.exe")

if os.name == "nt" and os.path.exists(custom_cmd):
    pytesseract.pytesseract.tesseract_cmd = custom_cmd
elif shutil.which("tesseract"):
    pytesseract.pytesseract.tesseract_cmd = shutil.which("tesseract")


def extract_text(image_source):
    try:
        image = Image.open(image_source)
        if image.mode not in ("L", "RGB"):
            image = image.convert("RGB")
        text = pytesseract.image_to_string(image)
        return text or ""
    except Exception as e:
        print("OCR Extraction Error:", e)
        return ""