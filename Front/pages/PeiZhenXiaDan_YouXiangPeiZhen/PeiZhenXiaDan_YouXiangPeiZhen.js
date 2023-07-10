// pages/PeiZhenXiaDan_YouXiangPeiZhen/PeiZhenXiaDan_YouXiangPeiZhen.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nav: [
            {
                title: "推荐",
                id: 0
            },
            {
                title: "食物",
                id: 1
            },
            {
                title: "服装",
                id: 2
            },
            {
                title: "用品",
                id: 3
            }
        ],
        list: [
            {
                id: 1,
                name: '辣条',
                price: 3.5,
                type: 1
            },
            {
                id: 2,
                name: '辣条1',
                price: 3.5,
                type: 1
            },
            {
                id: 3,
                name: '男装',
                price: 300,
                type: 3
            },
            {
                id: 4,
                name: '豆腐',
                price: 1,
                type: 1
            },
            {
                id: 5,
                name: '女装',
                price: 150,
                type: 2
            },
            {
                id: 6,
                name: '儿童装',
                price: 80,
                type: 2
            },
            {
                id: 7,
                name: '锅',
                price: 58,
                type: 3
            },
            {
                id: 8,
                name: '床上四件套',
                price: 155,
                type: 3
            },
        ],
        curNav: 0,
        curIndex: 0
    },
    navTap(e) {
        let id = e.currentTarget.dataset.id;
        console.log(id);
        this.setData({
            curNav: id,
            curIndex: id
        })
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