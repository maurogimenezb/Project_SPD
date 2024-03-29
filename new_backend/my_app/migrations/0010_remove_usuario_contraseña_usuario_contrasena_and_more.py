# Generated by Django 5.0.1 on 2024-01-25 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('my_app', '0009_rename_password_usuario_contraseña_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='contraseña',
        ),
        migrations.AddField(
            model_name='usuario',
            name='contrasena',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='usuario',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='my_app_usuarios', to='auth.group'),
        ),
        migrations.AddField(
            model_name='usuario',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
        migrations.AddField(
            model_name='usuario',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='usuario',
            name='password',
            field=models.CharField(default=1, max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usuario',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, related_name='my_app_usuarios', to='auth.permission'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='usuario',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
