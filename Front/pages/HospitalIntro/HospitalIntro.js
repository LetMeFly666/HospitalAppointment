/*
 * @Author: LetMeFly
 * @Date: 2023-08-31 11:57:11
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-09-01 12:03:46
 */
// pages/HospitalIntro/HospitalIntro.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        hospitalInfo: {}
    },

    parseContent(content) {
        // content = String(content);
        // return content.split('\n');
        content = String(content);
        content = content.split('\n').join('</p><p class="rich-p" style="margin-top: 20px">');
        console.log(content)
        content = '<p class="rich-p">' + content + '</p>';
        console.log(content)
        return content;
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

        hospitalInfo.introContent = this.parseContent(hospitalInfo.introContent);

        this.setData({
            id: options.id,
            hospitalInfo: hospitalInfo
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