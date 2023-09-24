<!--
 * @Author: LetMeFly
 * @Date: 2023-08-15 22:11:19
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-09-24 22:24:01
-->
# 后端接口

除非特殊说明，否则以下所有接口的前缀均为```https://www.letmefly.xyz/LetHA/```（该端口的所有请求将被转发到该项目的后端）。

例如```static/pic/banner/1.png```的完整地址为```https://www.letmefly.xyz/LetHA/static/pic/banner/1.png```

## 图片服务

```GET: static/pic/xxx```

### 首页banner

+ ```GET: static/pic/banner/1.png```
+ ```GET: static/pic/banner/2.jpg```
+ ```GET: static/pic/banner/3.png```
+ ```GET: static/pic/banner/4.png```

## 服务相关

下单、登录、个人单号...

### 个人-登录

```GET: user/login```

## 支付相关

微信支付

# 数据库描述

## 用户信息

数据库```User```：

|字段|类型|描述|
|:--:|:--:|:--:|
|userid|INT|自定义的userid|
|wx_openid|VARCHAR(255)|微信openid|
|wx_session_key|VARCHAR(512)|微信session_key|
|wx_unionid|VARCHAR(512)|微信unionid（May空？）|
|nickname|VARCHAR(32)|用户昵称|
|avatar_url|VARCHAR(256)|用户头像链接（注意检查是否失效）|
|warrant|VARCHAR(32)|自定义的warrant|

## 就诊人管理

数据库```Friend```：

|字段|类型|描述|
|:--:|:--:|:--:|
|id|INT|django的id|
|friend|INT|是谁的就诊人（User.userid的外键）|
|if18|VARCHAR(1)|是否已18周岁（y/n）|
|name|VARCHAR(16)|就诊人姓名|
|sex|VARCHAR(1)|性别(b/g)|
|phone|VARCHAR(32)|手机号|
|idcard|VARCHAR(32)|身份证号|
|relation|VARCHAR(32)|就诊人关系（父母/子女/兄弟姐妹/本人/夫妻/其他）|

## 陪诊员管理

数据库```Runner```：

|字段|类型|描述|
|:--:|:--:|:--:|
|id|INT|django的id|
|name|VARCHAR(16)|陪诊员姓名|
|phone|VARCHAR(32)|手机号|
|status|VARCHAR(5)|状态（申请中/已拒绝/已接收）（后续可能增加）|

## 陪诊记录

数据库```Log```：

|字段|类型|描述|
|:--:|:--:|:--:|
|id|INT|django的id|
|hospitalid|INT|医院id（1-14）|
|serviceid|INT|服务id（1）|
|userid|INT|发起用户的id|
|friendid|INT|就诊人id|
|requestTime|TIME|发起服务请求的时间|
|ifpaid|VARCHAR(1)|是否支付(y/n)|
|paidtime|TIME|支付时间|
|paidmoneyTimes100|INT|支付金额（单位是分！！！）使用整数避免了浮点数误差|
|iffinish|VARCHAR(1)|是否已经陪诊完成(y/n)|
|whofinished|INT|谁完成的陪诊（陪诊员ID）|
|more|VARCHAR(65535)|备注|

## 金额管理

数据库```Money```（更像是表“Log”非零money的一个视图）：

|字段|类型|描述|
|:--:|:--:|:--:|
|id|INT|django的id|
|logid|INT|哪次记录收取的（对应的Log数据库的id）|
|moneyTimes100|INT|这次收取了多少钱（和Log表中paidmoneyTimes100相同）|
|time|TIME|交易完成时间（和Log表中的paidtime相同）|
