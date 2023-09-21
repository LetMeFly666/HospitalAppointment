'''
Author: LetMeFly
Date: 2023-09-20 16:16:47
LastEditors: LetMeFly
LastEditTime: 2023-09-21 10:57:42
Description: 人员相关（用户信息、 就诊人、陪诊员）
'''
from django.http import HttpResponse


def helloWorld(reqeust):
    return HttpResponse('Hello from app')


def login(request):
    print(request.method)
    print('*' * 50)
    print(request.GET)
    print('*' * 50)
    print(request.POST)