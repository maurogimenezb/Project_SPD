from django.core.management.base import BaseCommand
from my_app.models import CustomUser

class Command(BaseCommand):
    def handle(self, *args, **options):
        # Crear dos usuarios fijos
        CustomUser.objects.create(username='mauro', password='123')
        CustomUser.objects.create(username='fabio', password='123')
        self.stdout.write(self.style.SUCCESS('Usuarios creados exitosamente.'))
