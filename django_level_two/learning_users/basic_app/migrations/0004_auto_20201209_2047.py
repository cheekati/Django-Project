# Generated by Django 3.0.5 on 2020-12-09 20:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('basic_app', '0003_auto_20201209_2022'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='is_answered',
        ),
        migrations.RemoveField(
            model_name='question',
            name='user',
        ),
        migrations.AddField(
            model_name='answer',
            name='is_answered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='answer',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]