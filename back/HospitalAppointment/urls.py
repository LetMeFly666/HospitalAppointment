'''
Author: LetMeFly
Date: 2023-08-17 16:37:36
LastEditors: LetMeFly
LastEditTime: 2024-01-19 20:58:45
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
from app import interface, baseFunction

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', interface.User.helloWorld),
    path('login/', interface.User.login),
    path('user/apply2be1caregiver', interface.User.apply2be1caregiver),
    path('user/add1friend', interface.User.add1friend),
    path('user/getFriends', interface.User.getFriends),
    path('user/delete1friend', interface.User.delete1friend),
    path('hello/html/', baseFunction.HTML.html('helloWorld.html')),
    # 管理员界面 - 陪诊员
    path('runners/', interface.Admin.runnerList, name='runner_list'),
    path('runners/edit/<int:runnerId>/', interface.Admin.editRunnerStatus, name='edit_runner'),
]

# 很奇怪，DEBUG=False下加上下面那个才能访问到图片；DEBUG=True下加上下面的那个又访问不到图片了
if not settings.DEBUG:
    urlpatterns.append(url(r'^static/(?P<path>.*)$', static.serve, {'document_root': settings.STATIC_ROOT}, name='static'))
