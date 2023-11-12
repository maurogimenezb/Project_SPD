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
                        "type": "service_account",
        "project_id": "projectspd-398404",
        "private_key_id": "a575c772f513bca78384c0064da67422a3efabab",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCp32jAKx6OZIBK\nGxgi6EbJfZ7x8uQBiHGIpd3h+w904Fh9bRqBCwLZvo0uYYq1kcDRQjCPMXWicpZw\nz6UFVqiaXGRhg1iYgDI6cMbjWGX+xl03x3PM5yiNuppxW/9rLFtgGOoPqyhHfOaJ\neku6vr++LUrC3VxEIjlNFewHuesFxbyCYqqbBVjI6+OnKr20ZggUqz435lrqXK4+\nssuYNciRmsZcVDaYkAkB7YKCQmXrWUvASoz8w0PtwqPHVHoeAwiCUe1SisXD+VJc\n/wnAK+Uy0DPOpKbMNtdofo7MagegSbwE2MSqMbPbbMJN1id/svKm3Yzaj763D8O8\nU9n4lf5vAgMBAAECggEAArBwOpaUKcHqjAHIzIir0jXEZeUn+eQ8k+K4VAMC+CEz\nFW08Pa28clEDcCgIJ56ylD19gk7Qo20393o6DQ8VpTfwOOD47pUc9nLhmyjDmJhw\nUlk8epJwQGojVscTkJFHswpB7lSR0yvlhGikuUSayXpzFAmoE8YM7Sz7KxYk49b6\natgtz7ZJ5tqQsTsqyu4+rA/hqB0Ekp7r7Abgxj66Ct/fiMexYxMAhwUkmFJIvJw0\n4Lm4pWZqKz9uDlzDXjbTN09lvZ57VrB9nwtDg7qrTHTFtRbn6sUSHdfCTVkaIiN1\nqV83Zb+HP+7obb6rVvFWCD4vOpGhLRWAa50t+QtLoQKBgQDeIOM6eNHhu9Ct2Ln5\nmCztRHvxg+HHwLSMeb8S6W4oh4zxElAg7AxwVvK4p/V4U4htAGXW1CBZGdgzwpwX\nLlSBdwf6SEIa8LN2A6n2tsHhgjc0vPLPWKJ52+xr8UZYo1w4HqXRRIpd58p+ReLs\nvKNw8JxSxOj4mka2CZsYCAwMIQKBgQDDxqPrCl2B33db2w8r93LRdCKJxjvsc29+\nMFYZYI+K6tyBmqVqfSp+4JrmHTLhxncOoqEic2K+/XffOq3XxswnhQfPAtOYpaq0\nHuG0qGWwgVP9f9baH1GGaDTUfMhEtDzkyfoCVYKSKt3EDhg4g3rZCncl6YTJJOJY\nEFZoULQ4jwKBgBE8IgVebIKETRvADiYEna/HOYqyvej+1cN0itPP0uFIKzJlRlxX\nlFt/E5QqTAyLBrHWbxBtIxlmvPS/K9dMm/fzoWXVB3QJqxMEE8L1yTNTJC9uXbSi\n3vBvlPeHH/suqbAdCKalF8tTec20ZHgT5uaTdL2jU6Q+bDAhrKv/q9ehAoGBAKf1\nZjHCfcBrGDqM8DI3I6FAclUi5cwQqOlozKUO63cx0SW7qAh5A5lAVoPvLvT10LSU\nn4sv1NqoGExCSlyhaArLnYxjD2eZUZ8gE2FrS3qnKYiFQa12Svn1ssVNnH8c5lUe\nVsfj1pZSAlouAWeSnTVRPjEfa1UpuKn2sjriagtPAoGBAK6OambyNrg9lk5nKymi\nIqWw5T9/SUgdCIFddqWnd0cvs9iLZYBumwKuoDqgqbwzxNGtOx5Weh5JL/hBfhdg\n39l4i23ZJUkjpsMHmjJDtL4x0xdkCwKU9nmg0sAS1ySkz8n/D+t+gNbBKqhR0XBy\nYazQZK1KPSOf10//bgyesWwn\n-----END PRIVATE KEY-----\n",
        "client_email": "projectspd@projectspd-398404.iam.gserviceaccount.com",
        "client_id": "101962539085168705119",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/projectspd%40projectspd-398404.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
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
                        "type": "service_account",
        "project_id": "projectspd-398404",
        "private_key_id": "a575c772f513bca78384c0064da67422a3efabab",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCp32jAKx6OZIBK\nGxgi6EbJfZ7x8uQBiHGIpd3h+w904Fh9bRqBCwLZvo0uYYq1kcDRQjCPMXWicpZw\nz6UFVqiaXGRhg1iYgDI6cMbjWGX+xl03x3PM5yiNuppxW/9rLFtgGOoPqyhHfOaJ\neku6vr++LUrC3VxEIjlNFewHuesFxbyCYqqbBVjI6+OnKr20ZggUqz435lrqXK4+\nssuYNciRmsZcVDaYkAkB7YKCQmXrWUvASoz8w0PtwqPHVHoeAwiCUe1SisXD+VJc\n/wnAK+Uy0DPOpKbMNtdofo7MagegSbwE2MSqMbPbbMJN1id/svKm3Yzaj763D8O8\nU9n4lf5vAgMBAAECggEAArBwOpaUKcHqjAHIzIir0jXEZeUn+eQ8k+K4VAMC+CEz\nFW08Pa28clEDcCgIJ56ylD19gk7Qo20393o6DQ8VpTfwOOD47pUc9nLhmyjDmJhw\nUlk8epJwQGojVscTkJFHswpB7lSR0yvlhGikuUSayXpzFAmoE8YM7Sz7KxYk49b6\natgtz7ZJ5tqQsTsqyu4+rA/hqB0Ekp7r7Abgxj66Ct/fiMexYxMAhwUkmFJIvJw0\n4Lm4pWZqKz9uDlzDXjbTN09lvZ57VrB9nwtDg7qrTHTFtRbn6sUSHdfCTVkaIiN1\nqV83Zb+HP+7obb6rVvFWCD4vOpGhLRWAa50t+QtLoQKBgQDeIOM6eNHhu9Ct2Ln5\nmCztRHvxg+HHwLSMeb8S6W4oh4zxElAg7AxwVvK4p/V4U4htAGXW1CBZGdgzwpwX\nLlSBdwf6SEIa8LN2A6n2tsHhgjc0vPLPWKJ52+xr8UZYo1w4HqXRRIpd58p+ReLs\nvKNw8JxSxOj4mka2CZsYCAwMIQKBgQDDxqPrCl2B33db2w8r93LRdCKJxjvsc29+\nMFYZYI+K6tyBmqVqfSp+4JrmHTLhxncOoqEic2K+/XffOq3XxswnhQfPAtOYpaq0\nHuG0qGWwgVP9f9baH1GGaDTUfMhEtDzkyfoCVYKSKt3EDhg4g3rZCncl6YTJJOJY\nEFZoULQ4jwKBgBE8IgVebIKETRvADiYEna/HOYqyvej+1cN0itPP0uFIKzJlRlxX\nlFt/E5QqTAyLBrHWbxBtIxlmvPS/K9dMm/fzoWXVB3QJqxMEE8L1yTNTJC9uXbSi\n3vBvlPeHH/suqbAdCKalF8tTec20ZHgT5uaTdL2jU6Q+bDAhrKv/q9ehAoGBAKf1\nZjHCfcBrGDqM8DI3I6FAclUi5cwQqOlozKUO63cx0SW7qAh5A5lAVoPvLvT10LSU\nn4sv1NqoGExCSlyhaArLnYxjD2eZUZ8gE2FrS3qnKYiFQa12Svn1ssVNnH8c5lUe\nVsfj1pZSAlouAWeSnTVRPjEfa1UpuKn2sjriagtPAoGBAK6OambyNrg9lk5nKymi\nIqWw5T9/SUgdCIFddqWnd0cvs9iLZYBumwKuoDqgqbwzxNGtOx5Weh5JL/hBfhdg\n39l4i23ZJUkjpsMHmjJDtL4x0xdkCwKU9nmg0sAS1ySkz8n/D+t+gNbBKqhR0XBy\nYazQZK1KPSOf10//bgyesWwn\n-----END PRIVATE KEY-----\n",
        "client_email": "projectspd@projectspd-398404.iam.gserviceaccount.com",
        "client_id": "101962539085168705119",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/projectspd%40projectspd-398404.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
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
                        "type": "service_account",
        "project_id": "projectspd-398404",
        "private_key_id": "a575c772f513bca78384c0064da67422a3efabab",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCp32jAKx6OZIBK\nGxgi6EbJfZ7x8uQBiHGIpd3h+w904Fh9bRqBCwLZvo0uYYq1kcDRQjCPMXWicpZw\nz6UFVqiaXGRhg1iYgDI6cMbjWGX+xl03x3PM5yiNuppxW/9rLFtgGOoPqyhHfOaJ\neku6vr++LUrC3VxEIjlNFewHuesFxbyCYqqbBVjI6+OnKr20ZggUqz435lrqXK4+\nssuYNciRmsZcVDaYkAkB7YKCQmXrWUvASoz8w0PtwqPHVHoeAwiCUe1SisXD+VJc\n/wnAK+Uy0DPOpKbMNtdofo7MagegSbwE2MSqMbPbbMJN1id/svKm3Yzaj763D8O8\nU9n4lf5vAgMBAAECggEAArBwOpaUKcHqjAHIzIir0jXEZeUn+eQ8k+K4VAMC+CEz\nFW08Pa28clEDcCgIJ56ylD19gk7Qo20393o6DQ8VpTfwOOD47pUc9nLhmyjDmJhw\nUlk8epJwQGojVscTkJFHswpB7lSR0yvlhGikuUSayXpzFAmoE8YM7Sz7KxYk49b6\natgtz7ZJ5tqQsTsqyu4+rA/hqB0Ekp7r7Abgxj66Ct/fiMexYxMAhwUkmFJIvJw0\n4Lm4pWZqKz9uDlzDXjbTN09lvZ57VrB9nwtDg7qrTHTFtRbn6sUSHdfCTVkaIiN1\nqV83Zb+HP+7obb6rVvFWCD4vOpGhLRWAa50t+QtLoQKBgQDeIOM6eNHhu9Ct2Ln5\nmCztRHvxg+HHwLSMeb8S6W4oh4zxElAg7AxwVvK4p/V4U4htAGXW1CBZGdgzwpwX\nLlSBdwf6SEIa8LN2A6n2tsHhgjc0vPLPWKJ52+xr8UZYo1w4HqXRRIpd58p+ReLs\nvKNw8JxSxOj4mka2CZsYCAwMIQKBgQDDxqPrCl2B33db2w8r93LRdCKJxjvsc29+\nMFYZYI+K6tyBmqVqfSp+4JrmHTLhxncOoqEic2K+/XffOq3XxswnhQfPAtOYpaq0\nHuG0qGWwgVP9f9baH1GGaDTUfMhEtDzkyfoCVYKSKt3EDhg4g3rZCncl6YTJJOJY\nEFZoULQ4jwKBgBE8IgVebIKETRvADiYEna/HOYqyvej+1cN0itPP0uFIKzJlRlxX\nlFt/E5QqTAyLBrHWbxBtIxlmvPS/K9dMm/fzoWXVB3QJqxMEE8L1yTNTJC9uXbSi\n3vBvlPeHH/suqbAdCKalF8tTec20ZHgT5uaTdL2jU6Q+bDAhrKv/q9ehAoGBAKf1\nZjHCfcBrGDqM8DI3I6FAclUi5cwQqOlozKUO63cx0SW7qAh5A5lAVoPvLvT10LSU\nn4sv1NqoGExCSlyhaArLnYxjD2eZUZ8gE2FrS3qnKYiFQa12Svn1ssVNnH8c5lUe\nVsfj1pZSAlouAWeSnTVRPjEfa1UpuKn2sjriagtPAoGBAK6OambyNrg9lk5nKymi\nIqWw5T9/SUgdCIFddqWnd0cvs9iLZYBumwKuoDqgqbwzxNGtOx5Weh5JL/hBfhdg\n39l4i23ZJUkjpsMHmjJDtL4x0xdkCwKU9nmg0sAS1ySkz8n/D+t+gNbBKqhR0XBy\nYazQZK1KPSOf10//bgyesWwn\n-----END PRIVATE KEY-----\n",
        "client_email": "projectspd@projectspd-398404.iam.gserviceaccount.com",
        "client_id": "101962539085168705119",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/projectspd%40projectspd-398404.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
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