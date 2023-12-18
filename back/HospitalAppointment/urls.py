'''
Author: LetMeFly
Date: 2023-08-17 16:37:36
LastEditors: LetMeFly
LastEditTime: 2023-09-21 22:14:07
'''
"""HospitalAppointment URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views import static
from django.conf.urls import url
from django.conf import settings
from app import interface

urlpatterns = [
    path('admin/', admin.site.urls),
    url('hello', interface.User.helloWorld),
    url('login/', interface.User.login),
    url('user/apply2be1caregiver', interface.User.apply2be1caregiver),
    url('user/add1friend', interface.User.add1friend),
]

# 很奇怪，DEBUG=False下加上下面那个才能访问到图片；DEBUG=True下加上下面的那个又访问不到图片了
if not settings.DEBUG:
    urlpatterns.append(url(r'^static/(?P<path>.*)$', static.serve, {'document_root': settings.STATIC_ROOT}, name='static'))
