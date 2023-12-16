/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 18:08:50
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-12-16 16:15:44
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

    onLoad: function(options) {
        this.setData({
            hospitalList: app.hospitalList
        });
    }
})