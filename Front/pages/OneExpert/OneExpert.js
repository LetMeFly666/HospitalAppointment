/*
 * @Author: LetMeFly
 * @Date: 2023-09-01 22:46:41
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-01-26 19:16:52
 */
// pages/OneExpert/OneExpert.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        expertInfo: {}
    },

    imageView: function(event) {
        console.log(event);
        wx.previewImage({
            urls: [event.currentTarget.dataset.src]
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var expertInfo = {};
        for (var i = 0; i < app.expertList.length; i++) {
            if (String(options.id) == String(app.expertList[i].id)) {
                expertInfo = app.expertList[i];
                break;
            }
        }

        this.setData({
            id: options.id,
            expertInfo: expertInfo
        });

        wx.setNavigationBarTitle({
            title: expertInfo.name
        });
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