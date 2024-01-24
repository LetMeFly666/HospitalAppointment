'''
Author: LetMeFly
Date: 2023-09-20 16:16:47
LastEditors: LetMeFly
LastEditTime: 2024-01-24 21:29:53
Description: 人员相关（用户信息、 就诊人、陪诊员）
'''
from django.http import HttpResponse, JsonResponse
from app import models
from app.baseFunction import randmod, model2dict, money
import Secrets
import requests
import datetime



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
    - {
        hospitalId: 0,
        department: 第二科室,
        wantTime: 2024-01-23,
        serviceId: 1,
        friendid: 2,
        more: 女士优先,
    }

Response:
    - JSONResponse: 
        - 成功：{
            code: 0,
            id: 2,
            msg: '订单已创建',
            payment: {
                timeStamp: '1706082258',
                nonceStr: '9dbe7ddf4a234cc1ac40234c00a0f1bc',
                package: 'prepay_id=wx241544197960911e19ecaee0183a9a0000',
                signType: 'RSA',  // 当前为固定值
                paySign: 'DwLNcRgKY2SppbdpYv90lg2y19O77LK30qFXjltEVwmCL1HMJRMVqPZsWyvmjWrEL51n0MxiU4toALA4SuiIOmYXo7enFkqO6QHDWk9f1YSMWFa9rItfmdUuJPPxiBbGsL3/uz2kv7U50HeY6r1ohrvm2qNRhtqbf2CfJhq1puJh/Nhl7iyLsfdTIVsmhVsWxOqc3bKq5idG8QmltX6PqIePLRT4fcU6rdsZCHkvAKSEyngqjwwXG3gnhmS5euwN59NP8aboh6Yd540s08FhMcW5+lH8xQpmOY+n55tHJx0im/3QOMuCsuyFzS3K8QXBoaLu5OtvendaVq/vMP3HSw=='
            }
        }
        - 失败(code=500)： {
            code: -1,  // 可能是其他非零情况
            result: {
                'reason': {
                    'code': 'PARAM_ERROR',
                    'detail': {'location': 'body', 'value': 4},
                    'message': '无法将 JSON 输入源“/body/payer/openid”映射到目标字段“用户标识”中，此字段需要一个 string 类型的 Json 值'
                }
            }
        }
"""
def create1order(request):
    warrant = request.POST.get('warrant')
    userObject = models.User.objects.get(warrant=warrant)
    userid = userObject.userid
    userOpenid = userObject.wx_openid
    hospitalId = request.POST.get('hospitalId')
    department = request.POST.get('department')
    wantTime = request.POST.get('wantTime')
    serviceId = request.POST.get('serviceId')
    friendid = request.POST.get('friendid')
    more = request.POST.get('more')
    unpaidObject = models.Log.objects.filter(userid=userid, ifpaid='n')
    if unpaidObject:
        unpaidId = unpaidObject.values()[0]['id']
        unpaidObject.update(hospitalid=hospitalId, department=department, wantTime=wantTime, serviceid=serviceId, friendid=friendid, more=more)
    else:
        thisObject = models.Log.objects.create(hospitalid=hospitalId, department=department, wantTime=wantTime, serviceid=serviceId, userid=userid, friendid=friendid, requestTime=datetime.datetime.now(), ifpaid='n', iffinish='n', more=more)
        thisObject.save()
        unpaidId = thisObject.id
    serviceObject = models.Service.objects.get(id=serviceId)
    name = serviceObject.name
    type_ = serviceObject.type
    name += type_
    amount = int(type_.split('/')[0].split('￥')[1]) * 100
    payment = money.generate1pay(userOpenid, amount, name)
    if payment['code']:
        print(payment)
        return JsonResponse(payment, status=500)
    return JsonResponse({
        'code': 0,
        'id': unpaidId,
        'msg': '订单已创建',
        'payment': {
            'timeStamp': payment['result']['timeStamp'],
            'nonceStr': payment['result']['nonceStr'],
            'package': payment['result']['package'],
            'signType': payment['result']['signType'],
            'paySign': payment['result']['paySign'],
        }
    })


"""
删除一个订单
"""
def delete1order(request):
    warrant = request.POST.get('warrant')
    id = request.POST.get('id')
    userid = models.User.objects.get(warrant=warrant).userid
    logObject = models.Log.objects.get(userid=userid, id=id)
    if logObject.ifpaid != 'n':
        return JsonResponse({'code': -1, 'msg': '仅支持删除未支付的订单'}, status=500)
    logObject.delete()
    return JsonResponse({'code': '0', 'msg': '删除成功'})


"""
修改支付状态
"""
def updatePaymentStatus(openid):
    pass


"""
微信支付回调函数
"""
def wxpayCallback(request):
    headers = {
        'Wechatpay-Signature': request.META.get('HTTP_WECHATPAY_SIGNATURE'),
        'Wechatpay-Timestamp': request.META.get('HTTP_WECHATPAY_TIMESTAMP'),
        'Wechatpay-Nonce': request.META.get('HTTP_WECHATPAY_NONCE'),
        'Wechatpay-Serial': request.META.get('HTTP_WECHATPAY_SERIAL')
    }
    result = money.wxpayCallback(headers, request.body)
    print(result)
    if result and result.get('event_type') == 'TRANSACTION.SUCCESS':
        resp = result.get('resource')
        treadNum = resp.get('out_trade_no')
        transactionId = resp.get('transaction_id')
        time = resp.get('success_time')
        openid = resp.get('payer').get('openid')
        moneyTimes100 = resp.get('amount').get('total')
        # TODO: 根据返回参数进行必要的业务处理，处理完后返回200或204
        print(f'resp: {resp}')
        print(f'out_trade_no: {treadNum}')
        print(f'transaction_id: {transactionId}')
        print(f'success_time: {time}')
        print(f'payer: {openid}')
        print(f'amount: {moneyTimes100}')
        return JsonResponse({'code': 0, 'message': '成功'})
    else:
        return JsonResponse({'code': -1, 'message': '失败'})
