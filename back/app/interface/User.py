'''
Author: LetMeFly
Date: 2023-09-20 16:16:47
LastEditors: LetMeFly
LastEditTime: 2023-12-18 23:00:01
Description: 人员相关（用户信息、 就诊人、陪诊员）
'''
from django.http import HttpResponse, JsonResponse
from app import models
from app.baseFunction import randmod
import Secrets
import requests



def helloWorld(reqeust):
    return HttpResponse('Hello from app')


def login(request):
    code = request.GET.get('code')
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
    warrant = randmod.randCN(32)
    models.User.objects.update_or_create(defaults={'wx_session_key': sessionKey, 'wx_unionid': unionid, 'warrant': warrant}, wx_openid=openid)
    return JsonResponse({'warrant': warrant})


def apply2be1caregiver(request):
    # TODO: 2 <= len(name) <= 16
    #       6 <= len(phone) <= 32
    warrant = request.POST.get('warrant')
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    userid = models.User.objects.get(warrant=warrant).userid
    runner = models.Runner(userid=userid, name=name, phone=phone, status='待联系')
    runner.save()
    return JsonResponse({'msg': '操作成功'})


def add1friend(request):
    # TODO: 2 <= len(name) <= 16
    #       6 <= len(phone) <= 32
    #       10 <= len(idcard) <= 32
    warrant = request.POST.get('warrant')
    if18 = request.POST.get('if18')
    name = request.POST.get('name')
    sex = request.POST.get('sex')
    phone = request.POST.get('phone')
    idcard = request.POST.get('idcard')
    relation = request.POST.get('relation')
    relations = ['本人', '父母', '子女', '兄弟姐妹', '夫妻', '其他']  # 若要改，勿忘前端
    if relation not in relations:
        return -1  # 不httpresponse了
    userid = models.User.objects.get(warrant=warrant).userid
    friend = models.Friend(friend=userid, if18=if18, name=name, sex=sex, phone=phone, idcard=idcard, relation=relation)
    friend.save()
    return JsonResponse({'msg': '操作成功'})


def getFriends(request):
    warrant = request.GET.get('warrant')
    print(warrant)
    print(request.GET)
    print(request.POST)
    userid = models.User.objects.get(warrant=warrant).userid
    friends = models.Friend.objects.filter(friend=userid)
    print(friends)
    return JsonResponse({'msg': '查询成功！', 'data': friends})