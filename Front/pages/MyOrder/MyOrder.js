// pages/MyOrder/MyOrder.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 这里认为 已付款=在服务
        typeList: ['全部', '待付款', '已付款', '在服务', '已完成'],
        typeIndex: 0,
        orders: [{
            id: 1,
            date: '2023-12-16',
            service: '特需门诊VIP陪诊服务',
            price: '￥588',
            progress: '待付款'
        }, {
            id: 2,
            date: '2023-12-16',
            service: '特需门诊VIP陪诊服务',
            price: '￥588',
            progress: '已付款'
        }, {
            id: 3,
            date: '2023-12-16',
            service: '特需门诊VIP陪诊服务',
            price: '￥588',
            progress: '已完成'
        }],
        ordersToShow: []
    },

    // 跳转到订单详情页面（支付页面/pages/Pay/Pay）
    gotoOrderDetail(event) {
        const id = event.currentTarget.dataset.id;
        const url = `/pages/Pay/Pay?showDetailId=${id}`;
        wx.navigateTo({url: url});
    },

    // 筛选符合规则的订单并返回
    selectOrders() {
        var ordersToShow = [];
        if (!this.data.typeIndex) {
            ordersToShow = this.data.orders;
        }
        else if (this.data.typeIndex == 1) {
            for (var i = 0; i < this.data.orders.length; i++) {
                if (this.data.orders[i]['progress'] == '待付款') {
                    ordersToShow.push(this.data.orders[i]);
                }
            }
        }
        else if (this.data.typeIndex == 2) {
            for (var i = 0; i < this.data.orders.length; i++) {
                if (this.data.orders[i]['progress'] == '已付款') {
                    ordersToShow.push(this.data.orders[i]);
                }
            }
        }
        else if (this.data.typeIndex == 3) {
            for (var i = 0; i < this.data.orders.length; i++) {
                if (this.data.orders[i]['progress'] == '已付款') {
                    ordersToShow.push(JSON.parse(JSON.stringify(this.data.orders[i])));  // 笨方法实现深拷贝
                    ordersToShow[ordersToShow.length - 1]['progress'] = '在服务'
                }
            }
        }
        else {  // typeIndex = 4
            for (var i = 0; i < this.data.orders.length; i++) {
                if (this.data.orders[i]['progress'] == '已完成') {
                    ordersToShow.push(this.data.orders[i]);
                }
            }
        }
        this.setData({
            ordersToShow: ordersToShow
        });
    },

    change1type(event) {
        const val = event.currentTarget.dataset.type;
        this.setData({
            typeIndex: val
        });
        this.selectOrders();
    },

    /**
     * 获取所有订单
     */
    getOrders(then) {
        const that = this;
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/getOrderStatus/',
            success(response) {
                const data = response.data['data'];
                that.setData({
                    orders: data
                });
                then();
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const type = parseInt(options.type);
        this.setData({
            typeIndex: type
        });

        this.getOrders(this.selectOrders);
        if (options.showConnect) {  // 付完款来的
            wx.showToast({
                title: '请联系客服或等待客服联系，也可点击查看订单',
                icon: 'none',
                duration: 10000
            })
        }
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