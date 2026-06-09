import json
import os
import google.generativeai as genai
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Ensure your API key is configured. You can also import this from django.conf.settings
genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

@login_required
def chat_api(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data from the frontend
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()

            if not user_message:
                return JsonResponse({"error": "Message cannot be empty"}, status=400)

            # Give Gemini a system prompt so it acts like a healthcare assistant
            system_prompt = (
                "You are an AI Healthcare Assistant for a medical platform. "
                "Answer the user's health-related questions concisely, safely, and in simple language. "
                "Always remind them to consult a doctor for serious issues. "
                f"User's Question: {user_message}"
            )

            # Generate the response
            response = model.generate_content(system_prompt)
            
            return JsonResponse({"reply": response.text})

        except Exception as e:
            return JsonResponse({"error": "An error occurred while connecting to AI."}, status=500)
            
    return JsonResponse({"error": "Invalid request method"}, status=405)
 
@login_required
def chat_interface(request):
    """Renders the HTML page holding the chat UI."""
    return render(request, "chat.html")