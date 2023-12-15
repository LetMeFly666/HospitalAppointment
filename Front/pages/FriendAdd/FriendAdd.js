// pages/FriendAdd/FriendAdd.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        if18: '',
        name: '',
        sex: '',
        phone: '',
        relations: ['父母', '子女', '兄弟姐妹', '本人', '夫妻', '其他'],
        relation: '',

    },

    set1newValue(valueName) {
        console.log(valueName);
        const that = this;
        function setVal(event) {
            const val = event.detail.value;
            that.setData({
                valueName: val
            });
        }
        return setVal;
    },

    yesorno(event) {
        const val = event.detail.value;
        this.setData({
            if18: val
        });
    },

    inputname(event) {
        const val = event.detail.value;
        this.setData({
            name: val
        });
    },

    manorwoman(event) {
        const val = event.detail.value;
        this.setData({
            sex: val
        });
    },

    inputphone(event) {
        const val = event.detail.value;
        this.setData({
            phone: val
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