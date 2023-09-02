/*
 * @Author: LetMeFly
 * @Date: 2023-09-01 22:46:41
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-09-02 10:22:27
 */
// pages/ExpertsList/ExpertsList.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        hospitalInfo: {},
        expertList: []  // 本医院的医生列表
    },

    genExpertList: function(allExperts, expertIds) {
        const ans = [];
        for (var i = 0; i < allExperts.length; i++) {
            if (expertIds.indexOf(String(allExperts[i].id)) != -1) {
                ans.push(allExperts[i]);
            }
        }
        return ans;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var hospitalInfo = {};
        for (var i = 0; i < app.hospitalList.length; i++) {
            if (String(options.id) == String(app.hospitalList[i].id)) {
                hospitalInfo = app.hospitalList[i];
                break;
            }
        }

        var expertList = this.genExpertList(app.expertList, hospitalInfo.experts);

        this.setData({
            id: options.id,
            hospitalInfo: hospitalInfo,
            expertList: expertList
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