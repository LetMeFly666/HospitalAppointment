/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 18:08:50
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-02-26 11:05:43
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
    }
})