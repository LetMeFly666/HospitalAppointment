/*
 * @Author: LetMeFly
 * @Date: 2023-12-03 18:38:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-12-16 16:35:07
 */
// pages/Pay/Pay.js
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
        friends: ['请选择就诊人'],
        friendsIndex: 0,
        date: '请选择就诊时间'
    },

    getFriends() {
        // TODO: 无就诊人时提示前往添加就诊人
    },

    pick1friend(event) {
        const val = event.detail.value;
        this.setData({
            friendsIndex: val
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
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            priceWithText: options.priceWithText,
            serviceName: options.serviceName,
            id: options.id,
            priceValue: this.cleanPriceValue(options.priceWithText)
        })

        this.getFriends();
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})