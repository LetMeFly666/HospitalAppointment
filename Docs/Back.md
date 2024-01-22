<!--
 * @Author: LetMeFly
 * @Date: 2023-08-15 22:11:19
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-01-22 21:35:30
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

### 个人-查询就诊人

```GET: user/getFriends```

data:

+ ```warrant```: 授权令

response:

```json
{
    msg: '查询成功！',
    data: []
}
```

### 个人-添加就诊人

```POST: user/add1friend```

data:

+ ```warrant```: 授权令
+ ```if18```：是否18周岁y/n
+ ```name```：姓名
+ ```sex```：性别m/w
+ ```phone```：电话
+ ```idcard```：身份证号
+ ```relation```：与本人关系

### 个人-删除就诊人

```POST: user/delete1friend```

data:

+ ```warrant```: 授权令
+ ```id```: 要删除的friend的id

### 个人-申请成为陪诊员

```POST: user/apply2be1caregiver```

data:

+ ```warrant```: 授权令
+ ```name```: 姓名
+ ```phone```: 电话

### 个人-获取订单状态

```GET: user/getOrderStatus```

data:

+ ```warrant```: 授权令

response:

```json
{
    code: 0,
    data: [{
        id: 1,
        hospital: '西安医院',
        service: '特需门诊VIP陪诊服务',
        friendid: 2,
        date: '2023-12-16',
        paidTime: '2024-01-22 21:25:59'
        price: '￥588',
        progress: '待付款',  // 或 已付款 或 已完成
    }, {...}]
}
```

## 管理员相关

### 管理-陪诊员列表查看

用户在小程序中“申请成为陪诊员”后，其申请信息将会显示在这个html页面上。

```GET: runners/```

data:

+ ```COOKIE.LetHA```: 管理员密码

### 管理-修改陪诊员状态

```POST: runners/edit/<int:runnerId>/```

data:

+ ```COOKIE.LetHA```: 管理员密码
+ ```runnerID```(在url中): 要修改的陪诊员的ID
+ ```status```: 要设置的陪诊员新状态

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
|friendName|VARCHAR(16)|就诊人（发起用户的friend）名字|
|moneyTimes100|INT|这次收取了多少钱（和Log表中paidmoneyTimes100相同）|
|time|TIME|交易完成时间（和Log表中的paidtime相同）|

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