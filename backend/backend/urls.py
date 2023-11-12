from django.urls import path
from .views import translation_en
from .views import translation_it
from .views import translation_pt


urlpatterns = [
    path('translate_en/', translation_en, name='translation_en'),
    path('translate_it/', translation_it, name='translation_it'),
    path('translate_pt/', translation_pt, name='translation_pt'),
]
