/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 21:19:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-25 12:29:34
 */
// pages/My/My.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lastUpdateinfoTime: 0
    },

    apply2be1caregiver() {
        wx.redirectTo({url: '/pages/Apply2be1Caregiver/Apply2be1Caregiver'});
    },

    fakeUpdateInfo() {
        const clickTime = Date.parse(new Date());  // 模拟器中仅支持秒级的时间戳（后3位都是0）
        var notUpdate = false;
        if (clickTime - this.data.lastUpdateinfoTime < 2000) {
            notUpdate = true;
        }
        this.setData({
            lastUpdateinfoTime: clickTime
        });
        if (notUpdate) {
            wx.showToast({
                title: '点地太快了惹',
                icon: 'error',
                duration: 500
            });
            return ;
        }
        wx.showToast({
            title: '信息更新成功！',
            icon: 'success',
            duration: 1000
        });
    },

    make1phonecall() {
        wx.makePhoneCall({
            phoneNumber: '17795918257',
        });
    },

    friendPage() {
        wx.redirectTo({'url': '/pages/Friend/Friend'});
    },

    gotoOrder(event) {
        const type = event.currentTarget.dataset.type;
        wx.redirectTo({url: '/pages/MyOrder/MyOrder?type=' + type});
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

    shareData() {
        const that = this;
        return {
            title: '个人中心 - 西安全心陪诊',
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