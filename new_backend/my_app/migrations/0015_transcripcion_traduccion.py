# Generated by Django 5.0.1 on 2024-01-27 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_app', '0014_transcripcion_delete_usuario'),
    ]

    operations = [
        migrations.AddField(
            model_name='transcripcion',
            name='traduccion',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
