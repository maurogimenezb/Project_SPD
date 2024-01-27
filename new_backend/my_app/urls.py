# urls.py
from django.urls import path
from .views import translation_en
from .views import translation_it
from .views import translation_pt
from .views import transcripcion_view
from .views import guardar_transcripcion
from .views import obtener_historial
from .views import limpiar_historial





urlpatterns = [
    path('translate_en/', translation_en, name='translation_en'),
    path('translate_it/', translation_it, name='translation_it'),
    path('translate_pt/', translation_pt, name='translation_pt'),
    path('transcripcion/', transcripcion_view, name='transcripcion'),
    path('guardar_transcripcion/', guardar_transcripcion, name='guardar_transcripcion'),
    path('obtener_historial/', obtener_historial, name='obtener_historial'),
    path('limpiar_historial/', limpiar_historial, name='limpiar_historial'),




    # otras rutas...
]
