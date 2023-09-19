<!--
 * @Author: LetMeFly
 * @Date: 2023-08-15 22:11:19
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-09-19 09:46:17
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

## 支付相关

微信支付

# 数据库描述

## 用户信息

|字段|类型||描述
|:--:|:--:|:--:|
|userid|VARCHAR(64)|自定义的userid|
|wx_openid|VARCHAR(512)|微信openid|
|wx_session_key|VARCHAR(512)|微信session_key|
|wx_unionid|VARCHAR(512)|微信unionid（May空？）|
|nickname|VARCHAR(32)|用户昵称|
|avatar_url|VARCHAR(256)|用户头像链接（注意检查是否失效）|
