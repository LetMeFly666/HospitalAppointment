'''
Author: LetMeFly
Date: 2023-09-20 16:16:47
LastEditors: LetMeFly
LastEditTime: 2023-09-21 21:48:32
Description: 人员相关（用户信息、 就诊人、陪诊员）
'''
from django.http import HttpResponse
from app import models
import Secrets
import requests


def helloWorld(reqeust):
    return HttpResponse('Hello from app')


def login(request):
    code = request.GET.get('code')
    nickname = request.GET.get('nickname')
    avatarUrl = request.GET.get('avatar')
    response = requests.get(
        url='https://api.weixin.qq.com/sns/jscode2session',
        params={
            'appid': Secrets.APP_ID,
            'secret': Secrets.APP_SECRET,
            'js_code': code,
            'grant_type': 'authorization_code'
        }
    )
    data = response.json()
    openid = data.get('openid')
    sessionKey = data.get('session_key')
    unionid = data.get('unionid', '')

    
    
    