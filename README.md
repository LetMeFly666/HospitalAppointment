<!--
 * @Author: LetMeFly
 * @Date: 2023-08-15 22:32:21
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-01-24 15:37:06
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

接口文档详见[Docs/Back.md](Docs/Back.md)

## TODO

- [ ] 订单创建的实现（[点我](#todo-2)）
- [ ] 管理员——功能选择界面（[点我](#todo-3)）
- [ ] 管理员——订单状态界面（[点我](#todo-4)）
- [ ] 管理员——支付情况界面（[点我](#todo-5)）
- [ ] 服务条款勾选同意后无法取消
- [ ] GET请求时，warrant也作为data传递会在url中显示，不如在header中（小程序似乎会把header中的warrant改成HTTP_WARRANT）
- [ ] 退款功能（[issue#20](https://github.com/LetMeFly666/HospitalAppointment/issues/20)）
- [x] 后端获取订单状态接口（[pr#17](https://github.com/LetMeFly666/HospitalAppointment/pull/17)）
- [x] 管理员——陪诊员操作页面
- [x] 彩蛋：狂点“我的 -> 更新信息”时弹出提示
- [x] 对登录是否失效的检测（有头像≠登录中）：服务器上warrant有效期无限
- [x] 登录功能的后端实现
- [x] 搭建(django的)图片服务
- [x] 首页banner地址替换
- [x] 首页5图标替换
- [x] 首页14医院信息替换

### 订单创建的实现

<a id='todo-2'></a>详见[issue#7](https://github.com/LetMeFly666/HospitalAppointment/issues/7)。

对于[下订单界面```pages/Pay/Pay```](https://github.com/LetMeFly666/HospitalAppointment/tree/1fc5cc2f70521262d73ec6ffe98de57219d541cf/Front/pages/Pay/Pay.wxml)：

- [ ] 进入界面时向后端请求订单详情，并检查页面参数
   - [ ] 若带有“查看之前订单”的参数则载入之前的订单
   - [ ] 否则（视为创建新订单），若存在未支付的订单，弹出按钮选择“继续之前的订单”还是“删除之前的订单”
      - [ ] 若是“继续之前的订单”则从后端返回结果中载入之前的订单信息
      - [ ] 否则（“删除之前的订单”）向后端发起删除请求，并继续当前默认操作
- [ ] 点击“立即下单按钮”时创建订单（并提交到服务器），并弹出支付框
   - [ ] 若支付失败停留在当前页面
   - [ ] 若支付成功更新服务器订单状态，提示“请等待客服联系或主动联系客服”

对于[我的订单界面```pages/MyOrder/MyOrder```](https://github.com/LetMeFly666/HospitalAppointment/tree/1fc5cc2f70521262d73ec6ffe98de57219d541cf/Front/pages/MyOrder/MyOrder.wxml)：

- [ ] 点击订单会跳转到“下订单界面”，此时显示“订单状态”而不是“支付按钮”

对于[后端django服务](https://github.com/LetMeFly666/HospitalAppointment/tree/1fc5cc2f70521262d73ec6ffe98de57219d541cf/back)：

- [ ] 新增订单接口的实现
   - [ ] 当前用户存在已创建未支付的订单时，不是创建新订单而是更新未支付订单的内容为当前请求
   - [ ] 否则创建新订单
- [ ] 删除订单接口的实现
   - [ ] 仅支持删除“未支付”的订单
- [ ] 支付功能的实现

### 管理员——功能选择界面

<a id='todo-3'></a>详见[issue#9](https://github.com/LetMeFly666/HospitalAppointment/issues/9)。

- [ ] 一个简单的界面，选择是查看订单状态还是查看陪诊员申请情况。

### 管理员——订单状态界面

<a id='todo-4'></a>详见[issue#10](https://github.com/LetMeFly666/HospitalAppointment/issues/10)。

前端：

- [ ] 显示所有的订单（暂不支持分页）
  - 优先级：状态（已付款 > 待付款 > 已完成） > 时间（时间晚的优先）
- [ ] 支持更新备注
- [x] 支付发起退款

后端：

- [ ] 服务器显示所有订单接口
- [ ] 服务器显示所有陪诊员接口（默认陪诊员）
- [ ] 服务器更新状态接口

### 管理员——支付情况界面

<a id='todo-5'></a>详见[issue#16](https://github.com/LetMeFly666/HospitalAppointment/issues/16)。

- [ ] 显示已支付情况
