/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 21:19:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-09-21 21:23:55
 */
// pages/My/My.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    login() {
        wx.login({
            success(res) {
                if (res.code) {
                    wx.request({
                        url: 'https://www.letmefly.xyz/LetHA/login/',
                        data: {
                          code: res.code
                        }
                    })
                }
                else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
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
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})