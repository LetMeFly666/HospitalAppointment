'''
Author: LetMeFly
Date: 2024-01-19 20:13:14
LastEditors: LetMeFly
LastEditTime: 2024-01-19 20:16:05
'''
from django.shortcuts import render


def html(htmlName):
    def func(request):
        return render(request, htmlName)
    return func