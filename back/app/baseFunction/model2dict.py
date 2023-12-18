from django.core import serializers


"""models.Friend.objects.filter -> dict"""
def model2dict(model) -> dict:
    ans = []
    model = serializers.serialize('json', model)
    for m in model:
        ans.append(m['fields'])
    return ans
