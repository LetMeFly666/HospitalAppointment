'''
Author: LetMeFly
Date: 2023-09-24 22:16:33
LastEditors: LetMeFly
LastEditTime: 2023-09-24 22:20:04
'''
import random
import string


def randCN(length: int) -> str:  # rand char and number
    return ''.join([random.choice(string.ascii_letters + string.digits) for _ in range(length)])
