"""
将django的model对象转为列表中的字典

[{'id': 1, 'name': 'ha'}, {'id': 2, 'name': 'la'}]
"""
def model2dictlist(model, ignoreList=[]) -> dict:
    ans = []
    for m in model:
        thisDict = {}
        for key, val in m.items():
            if key not in ignoreList:
                thisDict[key] = val
        ans.append(thisDict)
    return ans
