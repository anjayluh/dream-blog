# Generated by Django 3.2.4 on 2021-06-03 10:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='date_created',
        ),
        migrations.RemoveField(
            model_name='article',
            name='date_updated',
        ),
    ]
