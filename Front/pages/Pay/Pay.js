/*
 * @Author: LetMeFly
 * @Date: 2023-12-03 18:38:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-12-26 11:13:09
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
        date: '请选择就诊时间'
    },

    toPay() {
        // TODO: 
    },

    getFriends() {
        const that = this;
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/getFriends',
            success(response) {
                const data = response.data['data'];
                if (!data.length) {
                    wx.showModal({
                        title: '暂无就诊人',
                        content: '是否前往添加就诊人',
                        cancelText: '我不',
                        confirmText: '好吧确实',
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
            }
        });
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