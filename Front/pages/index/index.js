// index.js
const app = getApp();
Page({
    data: {
        hospitalList: []
    },
    onLoad: function(options) {
        this.setData({
            hospitalList: app.hospitalList
        });
    }
})