/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 18:08:50
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-25 12:29:10
 */
// index.js
const app = getApp();
Page({
    data: {
        hospitalList: []
    },

    change2PeiZhenXiaDanPage() {
        console.log('clicked')
        wx.switchTab({'url': '/pages/PeiZhenXiaDan/PeiZhenXiaDan'});
    },

    make1phonecall() {
        wx.makePhoneCall({
            phoneNumber: '17795918257',
        });
    },

    onLoad: function(options) {
        this.setData({
            hospitalList: app.hospitalList
        });
    },

    shareData() {
        const that = this;
        return {
            title: '西安全心陪诊',
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