# Generated by Django 3.2 on 2024-01-22 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_alter_log_whofinished'),
    ]

    operations = [
        migrations.AddField(
            model_name='money',
            name='friendName',
            field=models.CharField(default='无效姓名-in test', max_length=16),
            preserve_default=False,
        ),
    ]
