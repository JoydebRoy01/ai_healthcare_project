from django.urls import path
from . import views

# Setting an app_name makes reverse URL lookups cleaner (e.g., {% url 'reports:list' %})
app_name = "reports"

urlpatterns = [
    path("", views.upload, name="list"),
]