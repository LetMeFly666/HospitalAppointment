'''
Author: LetMeFly
Date: 2023-09-01 18:27:52
LastEditors: LetMeFly
LastEditTime: 2023-09-01 18:29:00
'''
a, b = map(int, input().split())
ans = ''
for i in range(a, b + 1):
    ans += f", '{i}'"
ans = ans[2:]
print(ans)