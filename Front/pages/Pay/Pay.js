/*
 * @Author: LetMeFly
 * @Date: 2023-12-03 18:38:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-12-03 18:40:48
 */
// pages/Pay/Pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        priceWithText: '价格',
        serviceName: '服务名称',
        id: '服务id'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            priceWithText: options.priceWithText,
            serviceName: options.serviceName,
            id: options.id
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})