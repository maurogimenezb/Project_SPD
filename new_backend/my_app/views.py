# En tu views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Transcripcion_New
import json
from google.cloud import translate_v2 as translate
import speech_recognition as sr

@csrf_exempt
def transcripcion_view(request):
    try:
        audio_file = request.FILES['audio']

        recognizer = sr.Recognizer()

        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)

        text = recognizer.recognize_google(audio_data, language="es-ES")

        return JsonResponse({'transcription': text})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def translation_en(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            texto_a_traducir = data.get('text', '')
            
            # Credenciales de la cuenta de servicio
            credenciales = {

  }


            # Inicializar el cliente de traducción
            cliente_traduccion = translate.Client.from_service_account_info(credenciales)

            # Llamar a la API para realizar la traducción
            resultado_traduccion = cliente_traduccion.translate(
                texto_a_traducir,
                target_language='en'  # Código de idioma de destino
            )

            # Extraer el texto traducido del resultado
            texto_traducido = resultado_traduccion['translatedText']

            # Devolver el resultado como JSON
            return JsonResponse({"texto_original": texto_a_traducir, "texto_traducido": texto_traducido})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
def translation_it(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            texto_a_traducir = data.get('text', '')
            
            # Credenciales de la cuenta de servicio
            credenciales = {
}

            # Inicializar el cliente de traducción
            cliente_traduccion = translate.Client.from_service_account_info(credenciales)

            # Llamar a la API para realizar la traducción
            resultado_traduccion = cliente_traduccion.translate(
                texto_a_traducir,
                target_language='it'  # Código de idioma de destino
            )

            # Extraer el texto traducido del resultado
            texto_traducido = resultado_traduccion['translatedText']

            # Devolver el resultado como JSON
            return JsonResponse({"texto_original": texto_a_traducir, "texto_traducido": texto_traducido})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
def translation_pt(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            texto_a_traducir = data.get('text', '')
            
            # Credenciales de la cuenta de servicio
            credenciales = {
}

            # Inicializar el cliente de traducción
            cliente_traduccion = translate.Client.from_service_account_info(credenciales)

            # Llamar a la API para realizar la traducción
            resultado_traduccion = cliente_traduccion.translate(
                texto_a_traducir,
                target_language='pt'  # Código de idioma de destino
            )

            # Extraer el texto traducido del resultado
            texto_traducido = resultado_traduccion['translatedText']

            # Devolver el resultado como JSON
            return JsonResponse({"texto_original": texto_a_traducir, "texto_traducido": texto_traducido})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)


# En tu views.py

@csrf_exempt
def guardar_transcripcion(request):
    if request.method == 'POST':
        transcripcion_texto = request.POST.get('transcripcion_texto', '')
        traduccion_texto = request.POST.get('traduccion_texto', '')
        nueva_transcripcion = Transcripcion_New(texto=transcripcion_texto, traduccion=traduccion_texto)
        nueva_transcripcion.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'})


def obtener_historial(request):
    historial = Transcripcion_New.objects.all().values()
    return JsonResponse(list(historial), safe=False)

@csrf_exempt
def limpiar_historial(request):
    if request.method == 'DELETE':
        # Lógica para limpiar el historial (eliminación de registros en la base de datos)
        Transcripcion_New.objects.all().delete()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=405)
