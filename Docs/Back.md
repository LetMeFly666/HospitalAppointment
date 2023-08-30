<!--
 * @Author: LetMeFly
 * @Date: 2023-08-15 22:11:19
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-08-30 10:20:47
-->
# 后端接口

除非特殊说明，否则以下所有接口的前缀均为```https://www.letmefly.xyz/LetHA```（该端口的所有请求将被转发到该项目的后端）。

例如```/static/pic/banner/1.png```的完整地址为```https://www.letmefly.xyz/LetHA/static/pic/banner/1.png```

## 图片服务

```GET: /static/pic/xxx```

### 首页banner

+ ```GET: /static/pic/banner/1.png```
+ ```GET: /static/pic/banner/2.jpg```
+ ```GET: /static/pic/banner/3.png```
+ ```GET: /static/pic/banner/4.png```

### 

## 静态信息获取

```GET: /info/xxx```

### 医院基础信息

用于小程序主页，返回所有医院的基础信息

```GET: /info/hospitalBaseinfo```

```
{
    [{
        pic: 'https://xxxx',
        name: '西京医院',

    }],
    [/* 医院2 */],
    ...  // 共14个
}
```

## 服务相关

下单、登录、个人单号...

## 支付相关

微信支付
