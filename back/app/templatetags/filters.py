'''
Author: LetMeFly
Date: 2024-01-25 11:13:40
LastEditors: LetMeFly
LastEditTime: 2024-01-25 11:13:52
'''
from django import template

register = template.Library()


@register.filter(name='floatdiv')
def floatdiv(value, divisor):
    try:
        return float(value) / float(divisor)
    except (ValueError, ZeroDivisionError):
        return 0
