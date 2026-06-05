from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import easyocr
from pdf2image import convert_from_path
import numpy as np
import tempfile

from .ai_service import analyze_medical_report

reader = easyocr.Reader(['en'])

POPPLER_PATH = r"C:\poppler\Library\bin\poppler-25.12.0\Library\bin"


@login_required
def dashboard_home(request):

    analysis = None

    if request.method == "POST" and request.FILES.get("report"):

        uploaded_file = request.FILES["report"]

        # Save temporary PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            for chunk in uploaded_file.chunks():
                tmp.write(chunk)
            pdf_path = tmp.name

        # Convert PDF to images
        images = convert_from_path(pdf_path, poppler_path=POPPLER_PATH)

        extracted_text = ""

        for img in images:
            img_np = np.array(img)
            result = reader.readtext(img_np, detail=0)
            extracted_text += " ".join(result)

        # AI Analysis
        analysis = analyze_medical_report(extracted_text)

    return render(request, "dashboard/home.html", {
        "analysis": analysis
    })