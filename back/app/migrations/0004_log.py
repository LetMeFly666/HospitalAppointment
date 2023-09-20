# Generated by Django 3.2 on 2023-09-20 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_runner'),
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('hospitalid', models.IntegerField()),
                ('serviceid', models.IntegerField()),
                ('userid', models.IntegerField()),
                ('friendid', models.IntegerField()),
                ('requestTime', models.DateTimeField()),
                ('ifpaid', models.CharField(max_length=1)),
                ('paidtime', models.IntegerField(blank=True)),
                ('paidmoneyTimes100', models.TimeField()),
                ('iffinish', models.CharField(max_length=1)),
                ('whofinished', models.CharField(blank=True, max_length=1)),
                ('more', models.CharField(blank=True, max_length=10240)),
            ],
        ),
    ]