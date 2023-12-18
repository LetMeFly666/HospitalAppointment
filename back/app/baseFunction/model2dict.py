from django.core import serializers
import json


"""models.Friend.objects.filter -> dict"""
def model2dict(model) -> dict:
    ans = []
    model = serializers.serialize('json', model)
    print(model)
    print(type(model))  # 字符串？
    model = json.loads(model)
    for m in model:
        ans.append(m['fields'])
    return ans
