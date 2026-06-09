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
    return render(request, "dashboard.html")


@login_required
def analytics(request):
    return render(request, "analytics.html")


@login_required
def history(request):
    return render(request, "history.html")