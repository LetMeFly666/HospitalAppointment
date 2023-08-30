// index.js
const app = getApp();
Page({
    data: {
        hospitalList: []
    },
    onload: function(options) {
        this.setData({
            hospitalList: app.hospitalList
        });
    }
})