from django.urls import path
from . import views

urlpatterns = [
    path('test-speech-to-text/', views.test_speech_to_text, name='test-speech-to-text'),
]
