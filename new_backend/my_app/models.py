# En tu models.py

from django.db import models

class Transcripcion_New(models.Model):
    texto = models.TextField()
    traduccion = models.TextField()  # Agrega este campo
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Transcripción - {self.fecha_creacion}'
