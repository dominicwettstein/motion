# Generated by Django 3.0.3 on 2020-07-01 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='code',
            field=models.CharField(blank=True, help_text='Code used for verification', max_length=6),
        ),
    ]
