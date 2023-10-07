# Importa las clases necesarias desde los módulos de Django y Google Cloud Speech-to-Text
from django.http import JsonResponse
from google.cloud import speech_v1p1beta1 as speech

# Define una función llamada test_speech_to_text que toma un objeto 'request' de Django como argumento.
def test_speech_to_text(request):
    # Configura el cliente de Google Cloud Speech-to-Text con las credenciales
    credentials_dict = {
###
    }

    # Crea una instancia del cliente de Speech-to-Text utilizando las credenciales
    client = speech.SpeechClient.from_service_account_info(credentials_dict)

    # URL del archivo de audio en Google Cloud Storage
    audio_file_uri = "gs://mis-audiosmg97py/audioprueba5.wav"

    # Configura la solicitud de transcripción
    audio = {"uri": audio_file_uri}
    config = {
        # Formato de codificación de audio
        "encoding": speech.RecognitionConfig.AudioEncoding.LINEAR16,
        # Frecuencia de muestreo en hercios (Hz) del audio
        "sample_rate_hertz": 44100, 
        # Código de idioma para la transcripción (en este caso, inglés estadounidense)
        "language_code": "en-US",
    }

    # Realiza la solicitud de transcripción al servicio de Google Cloud Speech-to-Text
    response = client.recognize(config=config, audio=audio)

    # Procesa la respuesta para obtener el texto transcribido
    transcript = ""
    for result in response.results:
        transcript += result.alternatives[0].transcript

    # Retorna el texto transcribido como una respuesta JSON
    return JsonResponse({"transcript": transcript})