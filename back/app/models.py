'''
Author: LetMeFly
Date: 2023-09-19 10:00:24
LastEditors: LetMeFly
LastEditTime: 2023-09-24 22:08:00
'''
from django.db import models

# Create your models here.
class User(models.Model):
    userid = models.AutoField(primary_key=True)  # 这里primary_key=True一定要写，不然django会自动创建一个名为id的字段作为主键
    wx_openid = models.CharField(max_length=255, unique=True)
    wx_session_key = models.CharField(max_length=512)
    wx_unionid = models.CharField(max_length=512)
    nickname = models.CharField(max_length=32)
    avatar_url = models.CharField(max_length=256)


class Friend(models.Model):
    id = models.AutoField(primary_key=True)
    friend = models.IntegerField()
    if18 = models.CharField(max_length=1)
    name = models.CharField(max_length=16)
    sex = models.CharField(max_length=1)
    phone = models.CharField(max_length=32)
    idcard = models.CharField(max_length=32)
    relation = models.CharField(max_length=32)


class Runner(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=16)
    phone = models.CharField(max_length=32)
    status = models.CharField(max_length=5)


class Log(models.Model):
    id =  models.AutoField(primary_key=True)
    hospitalid = models.IntegerField()
    serviceid = models.IntegerField()
    userid = models.IntegerField()
    friendid = models.IntegerField()
    requestTime = models.DateTimeField()
    ifpaid = models.CharField(max_length=1)
    paidtime = models.IntegerField(blank=True)
    paidmoneyTimes100 = models.TimeField(default=0)
    iffinish = models.CharField(max_length=1)
    whofinished = models.CharField(max_length=1, blank=True)
    more = models.CharField(max_length=10240, blank=True)


class Money(models.Model):
    id = models.AutoField(primary_key=True)
    logid = models.IntegerField()
    moneyTimes100 = models.IntegerField()
    time = models.DateTimeField()
