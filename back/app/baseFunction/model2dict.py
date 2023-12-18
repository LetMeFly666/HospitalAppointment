from django.core import serializers


"""models.Friend.objects.filter -> dict"""
def model2dict(model) -> dict:
    ans = []
    model = serializers.serialize('python', model)
    print(model)
    print(type(model))  # 字典？
    # model = json.loads(model)
    for m in model:
        ans.append(m['fields'])
    return ans
