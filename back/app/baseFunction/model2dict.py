"""
将django的model对象转为列表中的字典

[{'id': 1, 'name': 'ha'}, {'id': 2, 'name': 'la'}]
"""
def model2dict(model) -> dict:
    ans = []
    for m in model:
        thisDict = {}
        for key, val in m.items():
            thisDict[key] = val
        ans.append(thisDict)
    return ans
