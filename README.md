<!--
 * @Author: LetMeFly
 * @Date: 2023-08-15 22:32:21
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-09-21 22:32:43
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
2. python中安装django等其他可能会用到的第三方库
3. mysql中新建一个空的数据库```HospitalAppointment```，并创建一个拥有读写此数据库权限的用户
4. 使用```nginx```等配置好端口转发，保证对域名的访问能够直接转发到django后端
5. 在[微信公众平台](https://mp.weixin.qq.com)注册并配置小程序：
   1. 准备好营业执照（只有企业才具有调用微信支付的权限）、对公银行卡等材料
   2. 申请小程序并完成小额汇款验证
   3. 申请微信支付接口并等待通过
   4. 修改前后端的```appID```、```appSecret```以及微信支付相关密钥等
   4. 上传前端```Front```目录下的小程序，提交审核等待通过
6. 在```Back/HospitalAppointment```目录下新建```Secrets.py```，并写入以下内容：
   ```python
   SECRET_KEY = 'django-insecure-428738sf45w4f5a4a4254534=-./'
   DATABASE_ADDRESS = '127.0.0.1'
   DATABASE_NAME = 'HospitalAppointment'
   DATABASE_USER = 'user'
   DATABASE_PASSWORD = '123'
   APP_ID = 'wx5c50bcb971eb5819'
   APP_SECRET = 'shfi3uyf292938748910uaffkjhebhxh'
   ```
7. 在```Back```目录下执行以下命令：
   1. ```python manage.py makemigrations```
   2. ```python manage.py migrate```
   3. ```python manage.py runserver```

## 接口文档

接口文档详见[Docs/Back.md](Docs/Back.md)

## TODO

- [ ] 登录功能的后端实现
- [ ] 对登录是否失效的检测（有头像≠登录中）
- [x] 搭建(django的)图片服务
- [x] 首页banner地址替换
- [x] 首页5图标替换
- [x] 首页14医院信息替换
