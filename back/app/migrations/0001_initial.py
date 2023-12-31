# Generated by Django 3.2 on 2023-09-19 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('userid', models.IntegerField(primary_key=True, serialize=False)),
                ('wx_openid', models.CharField(max_length=512)),
                ('wx_session_key', models.CharField(max_length=512)),
                ('wx_unionid', models.CharField(max_length=512)),
                ('nickname', models.CharField(max_length=32)),
                ('avatar_url', models.CharField(max_length=256)),
            ],
        ),
    ]
