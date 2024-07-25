/*
 * @Author: LetMeFly
 * @Date: 2023-12-03 18:38:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-25 13:22:36
 */
// pages/Pay/Pay.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        priceWithText: '价格',
        priceValue: 0,
        serviceName: '服务名称',
        id: '服务id',
        alreadyRead: false,
        remainTime: 5,
        showNotes: false,
        friends: [{
            name: '请选择就诊人',
            id: '-1'
        }],
        friends_onlyNames: ['请选择就诊人'],
        friendsIndex: 0,
        hospitals: [{id: '0', name: '其他医院（请备注）'}].concat(app.hospitalList),
        hospitals_onlyNames: ['请选择就诊医院'],
        hospitalsIndex: 1,
        hospitalCustom: '',
        date: '请选择就诊时间',
        orders: [],
        ifShowPayButton: true,
        department: '',  // 科室
        more: '',  // 服务需求
        progress: '待付款'
    },

    call1wechatPay(data) {
        wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
                wx.showToast({
                    title: '支付成功！',
                    icon: 'success',
                    duration: 1000
                });
                setTimeout(() => {
                    wx.redirectTo({url: '/pages/MyOrder/MyOrder?type=3&showConnect=true'});
                }, 1000);
            },
            fail(res) {
                console.log(res);
                app.show1toast_error('支付失败');
            }
        })
    },

    create1order() {
        const hospitalId = parseInt(this.data.hospitalsIndex);
        const department = this.data.department;
        const wantTime = this.data.date;
        const serviceId = this.data.id;
        const friendid = this.data.friends[this.data.friendsIndex].id;
        const more = this.data.more;
        const hospitalCustom = this.data.hospitalsIndex == 0 ? this.data.hospitalCustom : '';
        const data = {hospitalId, department, wantTime, serviceId, friendid, more, hospitalCustom};
        const that = this;
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/create1order/',
            method: 'POST',
            data: data,
            success(response) {
                that.call1wechatPay(response.data.payment)
            }
        });
    },

    toPay() {
        if (!this.data.alreadyRead) {
            app.show1toast_error('请先阅读条款');
            return;
        }
        this.create1order();
    },

    getFriends(options, then) {
        const that = this;
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/getFriends/',
            success(response) {
                const data = response.data['data'];
                if (!data.length) {
                    wx.showModal({
                        title: '暂无就诊人',
                        content: '是否前往添加就诊人',
                        cancelText: '取消',
                        confirmText: '确定',
                        success: function (res) {
                            if (res.confirm) {
                                wx.redirectTo({url: '/pages/FriendAdd/FriendAdd'});
                            } else {
                                wx.showToast({
                                    title: '可能导致无法支付',
                                    icon: 'error',
                                    duration: 1000
                                });
                            }
                        }
                    })
                }
                const friends_onlyNames = [];
                for (var i = 0; i < data.length; i++) {
                    friends_onlyNames.push(data[i]['name']);
                }
                that.setData({
                    friends: data,
                    friends_onlyNames: friends_onlyNames
                });
                then(options);
            }
        });
    },

    pick1friend(event) {
        const val = event.detail.value;
        this.setData({
            friendsIndex: val
        });
    },

    pick1hospital(event) {
        const val = event.detail.value;
        this.setData({
            hospitalsIndex: val
        });
    },

    inputNeeds(event) {
        const val = event.detail.value;
        this.setData({
            more: val
        });
    },

    inputDepartmentCustom(event) {
        const val = event.detail.value;
        this.setData({
            hospitalCustom: val
        });
    },

    inputDepartment(event) {
        const val = event.detail.value;
        this.setData({
            department: val
        });
    },

    /**
     * 处理医院名称列表
     */
    setHospitalNames() {
        const hospitalList = this.data.hospitals;
        const hospitals_onlyNames = [];
        for (var i = 0; i < hospitalList.length; i++) {
            hospitals_onlyNames.push(hospitalList[i].name);
        }
        this.setData({
            hospitals_onlyNames: hospitals_onlyNames
        });
    },

    pick1date(event) {
        const val = event.detail.value;
        this.setData({
            date: val
        });
    },

    readTheNotes() {
        this.setData({
            showNotes: true
        });
        const that = this;
        function wait1second() {
            console.log(that.data.remainTime);
            if (that.data.remainTime > 1) {
                that.setData({
                    remainTime: that.data.remainTime - 1
                });
                setTimeout(() => {
                    wait1second();
                }, 1000);
            }
            else {
                that.setData({
                    alreadyRead: true
                });
            }
        }
        this.setData({
            remainTime: this.data.remainTime + 1
        });
        wait1second();
    },

    agree() {
        this.setData({
            showNotes: false
        });
    },

    /**
     * 将所有数字拼接，不考虑小数点
     */
    cleanPriceValue(valueWithText) {
        var ans = 0;
        for (var i = 0; i < valueWithText.length; i++) {
            if (!isNaN(parseInt(valueWithText[i]))) {
                ans = ans * 10 + parseInt(valueWithText[i]);
            }
        }
        return ans;
    },

    /**
     * trim split parseInt
     */
    cleanPriceValue2(valueWithText) {
        return parseInt(valueWithText.trim().split('￥')[1]);
    },

    /**
     * 获取所有订单
     */
    getOrders(options, getFriends, then) {
        const that = this;
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/getOrderStatus/',
            success(response) {
                const data = response.data['data'];
                that.setData({
                    orders: data
                });
                getFriends(options, then);
            }
        });
    },

    // setDataWhenSeeingOrder_getHospitalsIndex(hospitalName) {
    //     for (var i = 0; i < this.data.hospitals.length; i++) {
    //         if (hospitalName == this.data.hospitals[i].name) {
    //             return i;
    //         }
    //     }
    //     return 0;  // 若无，则视为自定义医院  // 但是这样自定义医院与原始医院重名的话id会对不上
    // },

    setDataWhenSeeingOrder_getFriendsIndex(friendid) {
        for (var i = 0; i < this.data.friends.length; i++) {
            if (friendid == this.data.friends[i].id) {
                return i;
            }
        }
        console.log('ERROR! FRIEND NAME NOT FOUND!');
        return 0;  // ERROR
    },

    /**
     * 若为查看订单，则显示订单信息
     */
    setDataWhenSeeingOrder(orderId) {
        const that = this;
        function getOrderDetailById(orderId) {
            for (var i = 0; i < that.data.orders.length; i++) {
                if (that.data.orders[i].id == orderId) {
                    return that.data.orders[i];
                }
            }
            app.show1toast_error('无此订单！');
        }
        const thisOrder = getOrderDetailById(orderId);
        if (thisOrder.progress != '待付款') {
            that.setData({
                ifShowPayButton: false
            });
        }
        that.setData({
            priceWithText: thisOrder.price,
            serviceName: thisOrder.service,
            id: thisOrder.serviceId,
            priceValue: this.cleanPriceValue2(thisOrder.price),
            department: thisOrder.department,
            date: thisOrder.wantTime,
            more: thisOrder.more ? thisOrder.more : '没有填写',
            progress: thisOrder.progress,
            friendsIndex: this.setDataWhenSeeingOrder_getFriendsIndex(thisOrder.friendid),
            hospitalsIndex: thisOrder.hospitalid
        })
        if (thisOrder.hospitalid == 0) {
            that.setData({
                hospitalCustom: thisOrder.hospital
            })
        }
    },

    /**
     * 提醒支付已创建但未支付的订单
     * 当用户操作被判定为“创建新订单”时才会执行此函数
     */
    alertToPayLast() {
        const that = this;
        for (var i = 0; i < this.data.orders.length; i++) {
            if (this.data.orders[i].progress == '待付款') {
                console.log('待付款订单');
                wx.showModal({
                    title: '有待付款订单',
                    content: '是否前往付款',
                    cancelText: '删除该单',
                    confirmText: '去支付',
                    success: function (res) {
                        if (res.confirm) {
                            wx.redirectTo({url: `/pages/Pay/Pay?showDetailId=${that.data.orders[i].id}`});
                        }
                        else {  // 删除订单
                            app.myRequest({
                                url: 'https://www.letmefly.xyz/LetHA/user/delete1order/',
                                method: 'POST',
                                data: {
                                    id: that.data.orders[i].id
                                },
                                success(response) {
                                    wx.showToast({
                                        title: response.data.msg,
                                        icon: 'success',
                                        duration: 1000
                                    });
                                }
                            })
                        }
                    }
                });
                return;
            }
        }
    },

    /**
     * 获取所有订单后
     */
    afterGettingOrder(options) {
        if (options.showDetailId) {
            this.setDataWhenSeeingOrder(options.showDetailId);
        }
        else {  // 创建新订单
            this.alertToPayLast();
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setHospitalNames();
        this.getOrders(options, this.getFriends, this.afterGettingOrder);
        if (options.showDetailId) {  // 查看历史订单
            return;
        }
        // 下面为无“showDetailId”参数的时候（从下单页过来的）
        this.setData({
            priceWithText: options.priceWithText,
            serviceName: options.serviceName,
            id: options.id,
            priceValue: this.cleanPriceValue(options.priceWithText)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    shareData() {
        const that = this;
        return {
            title: '我的订单',
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return this.shareData();
    },

    /**
     * 分享到朋友圈
     */
    onShareTimeline() {
        return this.shareData();
    },
})