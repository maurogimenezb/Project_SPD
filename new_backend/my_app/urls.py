from django.urls import path
from .views import login_view, home
from .views import translation_en
from .views import translation_it
from .views import translation_pt
from .views import transcripcion_view



urlpatterns = [
    path('login/', login_view, name='login'),
    path('home/', home, name='home'),
    path('translate_en/', translation_en, name='translation_en'),
    path('translate_it/', translation_it, name='translation_it'),
    path('translate_pt/', translation_pt, name='translation_pt'),
    path('transcripcion/', transcripcion_view, name='transcripcion'),

]