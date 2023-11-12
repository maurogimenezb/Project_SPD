# backend/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import translate_v2 as translate

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