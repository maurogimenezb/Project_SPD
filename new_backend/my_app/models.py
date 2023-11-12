from django.db import models

class CustomUser(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
