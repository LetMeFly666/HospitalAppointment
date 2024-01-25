'''
Author: LetMeFly
Date: 2024-01-19 20:56:08
LastEditors: LetMeFly
LastEditTime: 2024-01-25 10:39:05
'''
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_POST
from django.db.models import Case, When, Value, IntegerField
from app import models
from app import baseFunction
import json


@baseFunction.decorators.checkAdminAuth
def runnerList(request):
    runners = models.Runner.objects.all()
    return render(request, 'runner.html', {'runners': runners})


@require_POST
@baseFunction.decorators.checkAdminAuth
def editRunnerStatus(request, runnerId):
    data = json.loads(request.body)
    status = data.get('status')
    runner = get_object_or_404(models.Runner, id=runnerId)
    runner.status = status
    runner.save()
    return JsonResponse({'code': 0, 'msg': '状态更新成功'})


@baseFunction.decorators.checkAdminAuth
def orderList(request):
    hospitals = {hospital.id: hospital.name for hospital in models.Hospital.objects.all()}
    services = {service.id: f'{service.name}({service.type})' for service in models.Service.objects.all()}
    friends = {friend.id: friend for friend in models.Friend.objects.all()}
    # orders =models.Log.objects.all()
    orders = models.Log.objects.annotate(
        sort_order=Case(
            When(ifpaid='y', iffinish='n', then=Value(1)),  # 已付款
            When(ifpaid='n', then=Value(2)),               # 待付款
            When(ifpaid='y', iffinish='y', then=Value(3)),  # 已完成
            default=Value(4),
            output_field=IntegerField()
        )
    ).order_by('sort_order', 'paidtime', 'requestTime')
    for log in orders:
        log.hospitalName = hospitals.get(log.hospitalid, '未知医院')
        log.serviceName = services.get(log.serviceid, '未知服务')
        friend = friends.get(log.friendid)
        if friend:
            log.friend_name = friend.name
            log.friend_if18 = '是' if friend.if18 == 'y' else '否'
            log.friend_sex = '男' if friend.sex == 'm' else '女'
            log.friend_phone = friend.phone
            log.friend_idcard = friend.idcard
        else:
            log.friend_name = '未知'
            log.friend_if18 = '未知'
            log.friend_sex = '未知'
            log.friend_phone = '未知'
            log.friend_idcard = '未知'
        if log.ifpaid == 'n':
            log.status = '待付款'
        elif log.iffinish == 'n':
            log.status = '已付款'
        else:
            log.status = '已完成'
        log.paidmoney = f'￥{log.paidmoneyTimes100 / 100:.2f}'
    return render(request, 'order.html', {'logs': orders})


@require_POST
@baseFunction.decorators.checkAdminAuth
def editFinishState(request):
    data = json.loads(request.body)
    logId = data.get('id')
    newStatus = data.get('status')
    log = models.Log.objects.get(id=logId)
    if newStatus == '已付款':
        log.iffinish = 'n'
    elif newStatus == '已完成':
        log.iffinish = 'y'
    log.save()
    return JsonResponse({'code': 0, 'msg': '状态更新成功'})


@require_POST
@baseFunction.decorators.checkAdminAuth
def editNotes(request):
    data = json.loads(request.body)
    log_id = data.get('id')
    new_notes = data.get('notes')
    log = models.Log.objects.get(id=log_id)
    log.notes = new_notes
    log.save()
    return JsonResponse({'code': 0, 'msg': '备注更新成功'})
