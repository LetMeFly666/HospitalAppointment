'''
Author: LetMeFly
Date: 2023-09-20 16:16:47
LastEditors: LetMeFly
LastEditTime: 2024-01-24 11:41:30
Description: 人员相关（用户信息、 就诊人、陪诊员）
'''
from django.http import HttpResponse, JsonResponse
from app import models
from app.baseFunction import randmod, model2dict
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
    userid = models.User.objects.get(warrant=warrant).userid
    friends = models.Friend.objects.filter(friend=userid).values()
    friends = model2dict.model2dictlist(friends)
    return JsonResponse({'msg': '查询成功！', 'data': friends})


def delete1friend(request):
    warrant = request.POST.get('warrant')
    friendId = request.POST.get('id')
    userid = models.User.objects.get(warrant=warrant).userid
    friend = models.Friend.objects.get(id=friendId, friend=userid)
    friend.delete()
    return JsonResponse({'msg': '删除成功！'})


"""
返回所有订单的记录：

Response: {
    code: 0,
    data: [{
        id: 1,
        hospital: '西安医院',
        department: '第二科室',
        wantTime: '2024-01-23',
        service: '特需门诊VIP陪诊服务',
        serviceId: 1,
        friendid: 2,
        date: '2023-12-16',  // 订单创建时间
        paidTime: '2024-01-22 21:25:59'
        price: '￥588',
        progress: '待付款',  // 或 已付款 或 已完成
        more: '女士优先',  // 用户备注
    }, {...}]
}
"""
def getOrderStatus(request):
    warrant = request.GET.get('warrant')
    userid = models.User.objects.get(warrant=warrant).userid
    orders = models.Log.objects.filter(userid=userid).values()
    orders = model2dict.model2dictlist(orders, ignoreList=['userid', 'whofinished', 'notes'])
    # 处理医院名
    hospitalInfo = models.Hospital.objects.all().values()
    hospitalInfo = model2dict.model2dictlist(hospitalInfo)
    hospitalInfoDict = {}
    for thisHospital in hospitalInfo:
        hospitalInfoDict[thisHospital['id']] = thisHospital['name']
    for order in orders:
        hospitalId = order['hospitalid']
        del order['hospitalid']
        order['hospital'] = hospitalInfoDict[hospitalId]
    # 处理服务名
    serviceInfo = models.Service.objects.all().values()
    serviceInfo = model2dict.model2dictlist(serviceInfo)
    serviceInfoDict = {}
    for thisService in serviceInfo:
        serviceInfoDict[thisService['id']] = (thisService['name'], thisService['type'])
    for order in orders:
        serviceId = order['serviceid']
        del order['serviceid']
        order['serviceId'] = serviceId
        order['service'] = serviceInfoDict[serviceId][0]
    # 处理日期
    for order in orders:
        date = order['requestTime']
        del order['requestTime']
        order['date'] = date.strftime('%Y-%m-%d')
        paidTime = order['paidtime']
        del order['paidtime']
        order['paidTime'] = paidTime.strftime('%Y-%m-%d %H:%M:%S') if paidTime else ''
    # 处理价格
    for order in orders:
        price = order['paidmoneyTimes100']
        del order['paidmoneyTimes100']
        order['price'] = f'￥{price / 100}'
        if not price:  # 未支付状态下金额显示为0
            order['price'] = serviceInfoDict[order['serviceId']][1].split('/')[0]
    # 处理状态
    for order in orders:
        ifPaid = order['ifpaid']
        del order['ifpaid']
        ifFinished = order['iffinish']
        del order['iffinish']
        if ifPaid == 'n':
            status = '待付款'
        elif ifFinished == 'n':
            status = '已付款'
        else:
            status = '已完成'
        order['progress'] = status
    return JsonResponse({'code': '0', 'data': orders})

"""
创建一个订单

Parameters:
    
"""
def create1order(reqeust):
    pass


"""
删除一个订单
"""
def delete1order(request):
    warrant = request.POST.get('warrant')
    id = request.POST.get('id')
    userid = models.User.objects.get(warrant=warrant).userid
    print(f'userid: {userid}')
    print(f'id: {id}')
    models.Log.objects.get(userid=userid, id=id).delete()
    return JsonResponse({'code': '0', 'msg': '删除成功'})
    