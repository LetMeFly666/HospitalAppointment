'''
Author: LetMeFly
Date: 2024-01-24 14:39:07
LastEditors: LetMeFly
LastEditTime: 2024-01-24 15:38:19
'''
from wechatpayv3 import WeChatPay, WeChatPayType
import Secrets
from string import ascii_letters, digits
from random import sample
import json
import time
import uuid


MCHID = Secrets.MCHID
with open('cert/apiclient_key.pem') as f:
    PRIVATE_KEY = f.read()
CERT_SERIAL_NO = Secrets.CERT_SERIAL_NO
APIV3_KEY = Secrets.APIV3_KEY
APPID = Secrets.APP_ID
NOTIFY_URL = Secrets.NOTIFY_URL
CERT_DIR = './cert/cert'
PARTNER_MODE = False
PROXY = None
wxpay = WeChatPay(
    wechatpay_type=WeChatPayType.MINIPROG,
    mchid=MCHID,
    private_key=PRIVATE_KEY,
    cert_serial_no=CERT_SERIAL_NO,
    apiv3_key=APIV3_KEY,
    appid=APPID,
    notify_url=NOTIFY_URL,
    cert_dir=CERT_DIR,
    # logger=LOGGER,
    partner_mode=PARTNER_MODE,
    proxy=PROXY
)


"""
生成一个微信支付订单

Parameters:
    - openid: 微信openid
    - amount: 支付金额的100倍（微信和我想的一样hh）
    - serviceName: 服务名称
"""
def generate1pay(openid, amount, serviceName):
    out_trade_no = ''.join(sample(ascii_letters + digits, 8))
    description = serviceName
    payer = {'openid': openid}
    code, message = wxpay.pay(
        description=description,
        out_trade_no=out_trade_no,
        amount={'total': amount},
        pay_type=WeChatPayType.MINIPROG,
        payer=payer
    )
    result = json.loads(message)
    if code in range(200, 300):
        prepay_id = result.get('prepay_id')
        timestamp = str(int(time.time()))
        noncestr = str(uuid.uuid4()).replace('-', '')
        package = 'prepay_id=' + prepay_id
        sign = wxpay.sign(data=[APPID, timestamp, noncestr, package])
        signtype = 'RSA'
        return {
            'code': 0,
            'result': {
                'appId': APPID,
                'timeStamp': timestamp,
                'nonceStr': noncestr,
                'package': 'prepay_id=%s' % prepay_id,
                'signType': signtype,
                'paySign': sign
            }
        }
    else:
        return {'code': -1, 'result': {'reason': result}}


"""
微信支付回调函数
"""
def wxpayCallback(headers, body):
    return wxpay.callback(headers=headers, body=body)
