<!--
 * @Author: LetMeFly
 * @Date: 2024-01-25 23:41:03
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-26 16:27:38
-->
# 数据库描述

## 用户信息

数据库```User```：

|字段|类型|描述|
|:--:|:--:|:--:|
|userid|INT|自定义的userid|
|wx_openid|VARCHAR(255)|微信openid|
|wx_session_key|VARCHAR(512)|微信session_key|
|wx_unionid|VARCHAR(512)|微信unionid（May空）|
|warrant|VARCHAR(32)|自定义的warrant|
|more|VARCHAR(128)|对用户的备注（可选）|
|avatar_url|VARCHAR(511)|用户头像网址（可选）|
|username|VARCHAR(63)|用户昵称（可选）|

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
|using|VARCHAR(1)|是否正在使用（没被删）（y/n）|

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
|hospitalid|INT|医院id（0-14）|
|hospitalCustom|VARCHAR(64)|自定义医院名（id为0时生效）|
|department|VARCHAR(64)|科室|
|wantTime|DATE|希望就诊的日期|
|serviceid|INT|服务id（1）|
|userid|INT|发起用户的id|
|friendid|INT|就诊人id|
|requestTime|TIME|发起服务请求的时间|
|ifpaid|VARCHAR(1)|是否支付(y/n)|
|paidtime|TIME|支付时间|
|paidmoneyTimes100|INT|支付金额（单位是分！！！）使用整数避免了浮点数误差|
|iffinish|VARCHAR(1)|是否已经陪诊完成(y/n)|
|whofinished|INT|谁完成的陪诊（陪诊员ID）|
|more|VARCHAR(10240)|用户备注|
|notes|VARCHAR(10240)|管理员备注|

## 金额管理

数据库```Money```（更像是表“Log”非零money的一个视图）：

|字段|类型|描述|
|:--:|:--:|:--:|
|id|INT|django的id|
|logid|INT|哪次记录收取的（对应的Log数据库的id）|
|friendName|VARCHAR(16)|就诊人（发起用户的friend）名字|
|moneyTimes100|INT|这次收取了多少钱（和Log表中paidmoneyTimes100相同）|
|time|TIME|交易完成时间（和Log表中的paidtime相同）|
|treadNum|VARCHAR(32)|微信交易号|
|transactionId|VARCHAR(64)|微信支付id|

## 医院列表

数据库```Hospital```（不考虑提供增删改查医院列表的代码，请手动到数据库中去编辑）：

|字段|类型|描述|
|:--:|:--:|:--:|
|id|INT|django的id|
|name|VARCHAR(64)|医院名|

## 服务列表

陪诊服务```Service```（需手动去数据库编辑）：

|字段|类型|描述|
|:--:|:--:|:--:|
|id|INT|django的id（全天的id=半天的id+100）|
|name|VARCHAR(64)|服务名|
|type|VARCHAR(32)|648一次/半天120/全天200|
