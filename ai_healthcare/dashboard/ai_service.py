import os

import google.genai as genai

API_KEY = os.environ.get('GOOGLE_API_KEY')
if not API_KEY:
    raise RuntimeError('Missing GOOGLE_API_KEY environment variable for Google GenAI API')

MODEL_NAMES = [
    'gemini-flash-latest',
    'gemini-3.5-flash',
    'gemini-2.5-flash',
]

client = genai.Client(api_key=API_KEY)


def format_model_response(response):
    if not getattr(response, 'candidates', None):
        return 'AI service returned no response.'

    parts = []
    candidate = response.candidates[0]
    for item in getattr(candidate, 'content', []):
        if isinstance(item, str):
            parts.append(item)
        else:
            parts.append(getattr(item, 'text', str(item)))

    return ''.join(parts).strip() or 'AI service returned an empty response.'


def analyze_medical_report(text):
    if not text:
        return 'No report text was extracted from the upload.'

    prompt = f"""
    You are a medical assistant AI.

    Analyze this medical report and explain it in simple language.

    REPORT:
    {text}

    Provide:

    1. Abnormal values
    2. Possible health issues
    3. Explanation in simple language
    4. Lifestyle advice
    5. When to consult a doctor
    """

    last_error = None
    for model_name in MODEL_NAMES:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
            )
            return format_model_response(response)
        except Exception as exc:
            last_error = exc
            continue

    return f'AI service error: {last_error}'
