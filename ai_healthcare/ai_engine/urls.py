from django.urls import path
from . import views

app_name = "ai_engine"

urlpatterns = [
    # The UI page: /ai_engine/assistant/
    path("assistant/", views.chat_interface, name="chat_interface"),
    
    # The API endpoint you already wrote: /ai_engine/chat/
    path("chat/", views.chat_api, name="chat_api"),
]