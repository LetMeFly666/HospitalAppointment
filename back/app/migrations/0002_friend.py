# Generated by Django 3.2 on 2023-09-19 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('friend', models.IntegerField()),
                ('if18', models.CharField(max_length=1)),
                ('name', models.CharField(max_length=16)),
                ('sex', models.CharField(max_length=1)),
                ('phone', models.CharField(max_length=32)),
                ('idcard', models.CharField(max_length=32)),
                ('relation', models.CharField(max_length=32)),
            ],
        ),
    ]
