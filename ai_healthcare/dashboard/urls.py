from django.urls import path
from . import views

app_name = "dashboard"

urlpatterns = [
    path("", views.dashboard_home, name="dashboard"),
    path("analytics/", views.analytics, name="analytics"),
    path("history/", views.history, name="history")
]