# Generated by Django 3.2 on 2023-09-24 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_alter_user_wx_openid'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='warrant',
            field=models.CharField(default=2, max_length=32),
            preserve_default=False,
        ),
    ]