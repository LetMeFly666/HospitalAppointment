from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_POST
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

