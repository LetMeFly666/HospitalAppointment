/*
 * @Author: LetMeFly
 * @Date: 2023-12-18 18:31:48
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-24 17:40:09
 */
// pages/Apply2be1Caregiver/Apply2be1Caregiver.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        phone: ''
    },

    apply() {
        const name = this.data.name;
        const phone = this.data.phone;
        if (name.length < 2) {
            app.show1toast_error('姓名至少两个字');
            return;
        }
        if (name.length > 16) {
            app.show1toast_error('姓名最多16字');
            return;
        }
        if (phone.length < 6) {
            app.show1toast_error('电话最少6位数');
            return;
        }
        if (phone.length > 32) {
            app.show1toast_error('电话最多32位');
            return;
        }
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/apply2be1caregiver/',
            method: 'POST',
            data: {
                name: name,
                phone: phone
            },
            success(response) {
                wx.showToast({
                    title: '电话通知结果',
                    icon: 'success',
                    duration: 5000
                });
            },
        });
    },

    inputTheName(event) {
        const val = event.detail.value;
        this.setData({
            name: val
        });
    },

    inputThePhone(event) {
        const val = event.detail.value;
        this.setData({
            phone: val
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
     * 分享到微信好友或微信朋友圈所需要的信息
     */
    shareData() {
        return {
            title: '快来申请成为陪诊员吧！',
            // path: '/page/user?id=123',  
            // imageUrl: 'https://example.com/path/to/image.jpg',  
            // success: function(res) {  
            //     // 分享成功  
            // },  
            // fail: function(res) {  
            //     // 分享失败  
            // }  
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