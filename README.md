<!--
 * @Author: LetMeFly
 * @Date: 2023-08-15 22:32:21
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-25 13:28:24
-->
# HospitalAppointment

微信小程序 - 医院预约

项目地址：[Github@LetMeFly666/HospitalAppointment](https://github.com/LetMeFly666/HospitalAppointment)

## 项目结构

+ ```Docs```是文档目录
+ ```Front```是前端目录，微信小程序在此
+ ```Back```是后端目录，服务端在此

## 使用方法

1. 在绑定了域名并开启了https的服务端上安装好python、mysql
2. python中安装django等其他可能会用到的第三方库（django、wechatpayv3）
3. mysql中新建一个空的数据库```HospitalAppointment```，并创建一个拥有读写此数据库权限的用户
4. 使用```nginx```等配置好端口转发，保证对域名的访问能够直接转发到django后端
5. 在[微信公众平台](https://mp.weixin.qq.com)注册并配置小程序：
   1. 准备好营业执照（只有企业才具有调用微信支付的权限）、对公银行卡等材料
   2. 申请小程序并完成小额汇款验证
   3. 申请微信支付接口并等待通过
   4. 修改前后端的```appID```、```appSecret```以及微信支付相关密钥等
   4. 上传前端```Front```目录下的小程序，提交审核等待通过
6. 在```Back```目录下新建```Secrets.py```，并写入以下内容：
   ```python
   SECRET_KEY = 'django-insecure-428738sf45w4f5a4a4254534=-./'
   DATABASE_ADDRESS = '127.0.0.1'
   DATABASE_NAME = 'HospitalAppointment'
   DATABASE_USER = 'user'
   DATABASE_PASSWORD = '123'
   APP_ID = 'wx5c50bcb971eb5819'
   APP_SECRET = 'shfi3uyf292938748910uaffkjhebhxh'
   ADMIN_PASSWORD = '123'  # 后台管理页面的密码
   MCHID = '1123652125'  # 商户号（微信支付相关更多可参考https://github.com/minibear2021/wechatpayv3）
   CERT_SERIAL_NO = 'SKFJFUEI484732ISFFEHUI3028RHUZHSUFEHISEF'  # 商户证书序列号
   APIV3_KEY = '0987654321ASDFGHJKLOasdfghjklp12'  # API v3密钥 https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_2.shtml
   NOTIFY_URL = 'https://www.letmefly.xyz/wechatpay/notify/'  # 微信支付成功后的回调地址（你的服务地址 加上```wechatpay/notify/```）
   ```
7. 在```Back/cert```目录下新建```apiclient_key.pem```，该文件为在微信商户平台申请的密钥
8. 在```Back```目录下执行以下命令：
   1. ```python manage.py makemigrations```
   2. ```python manage.py migrate```
   3. ```python manage.py runserver```

## 接口文档

+ 接口文档详见[Docs/Back.md](Docs/Back.md)
+ 数据库文档见[Docs/Database.md](Docs/Database.md)
+ 代码行数见[Docs/CountLines.md](Docs/CountLines.md)

## TODO

- [ ] 服务条款勾选同意后无法取消
- [ ] GET请求时，warrant也作为data传递会在url中显示，不如在header中（django似乎会把header中的warrant改成HTTP_WARRANT）
- [ ] 退款功能（[issue#20](https://github.com/LetMeFly666/HospitalAppointment/issues/20)）
- [ ] 寻求一种更快的图片加载方式（当前部署在我的小服务器上带宽太小了），例如CDN等。
- [ ] 导航页-我的-【就诊人管理/我的订单】页面后退时小程序直接返回到后台，没有返回到主页
- [ ] 导航页-我的-申请获取用户真正昵称和头像：[文档点我](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)
- [ ] 下单页面的医院选项中，最后一列新增“其他医院”选项
- [x] 开启分享功能
- [x] 很多页面的title都是Weixin（[issue#31](https://github.com/LetMeFly666/HospitalAppointment/issues/31)）——感谢内测用户[@Wang Bo](https://github.com/Pesuking)
- [x] 用户数据库的备注功能——id和openid和warrant都太抽象了（[issue#32](https://github.com/LetMeFly666/HospitalAppointment/issues/32)）
- [x] 管理员——功能选择界面（[issue#9](https://github.com/LetMeFly666/HospitalAppointment/issues/9)）
- [x] 管理员——支付情况界面（[issue#16](https://github.com/LetMeFly666/HospitalAppointment/issues/16)）
- [x] 管理员——订单状态界面（[issue#7](https://github.com/LetMeFly666/HospitalAppointment/issues/7)）
- [x] 订单创建的实现（[点我](#todo-2)）
- [x] 后端获取订单状态接口（[pr#17](https://github.com/LetMeFly666/HospitalAppointment/pull/17)）
- [x] 管理员——陪诊员操作页面
- [x] 彩蛋：狂点“我的 -> 更新信息”时弹出提示
- [x] 对登录是否失效的检测（有头像≠登录中）：服务器上warrant有效期无限
- [x] 登录功能的后端实现
- [x] 搭建(django的)图片服务
- [x] 首页banner地址替换
- [x] 首页5图标替换
- [x] 首页14医院信息替换
