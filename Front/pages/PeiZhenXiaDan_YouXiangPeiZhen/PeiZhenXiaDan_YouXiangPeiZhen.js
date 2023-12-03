// pages/PeiZhenXiaDan_YouXiangPeiZhen/PeiZhenXiaDan_YouXiangPeiZhen.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // conticeOrNotice: 0,
        serviceName: '',
        price: [],
        id: 0,
        picNameList: {
            '1': '01.特需门诊VIP陪诊服务',  // id->picName
            '2': '02.军警消及家属陪诊服务',
            '3': '03.全心全程VIP陪诊服务',
            '4': '04.全心全程陪诊服务',
            '5': '05.全心服务专家约诊',
            '6': '06.全心服务其他服务',
            '7': '07.全心服务门诊约号',
            '8': '08.全心服务代办问诊',
            '9': '09.全心服务代取结果',
            '10': '10.全心服务病案打印',
            '11': '11.全心服务代开药品'
        },
        picName: ''
    },

    toPay(event) {
        const priceWithText = event.target.dataset.price;
        const url = '/pages/Pay/Pay?priceWithText=' + priceWithText + '&serviceName=' + this.data.serviceName + '&id=' + this.data.id;
        wx.redirectTo({'url': url});
    },

    // clickBar(event) {
    //     this.setData({conticeOrNotice: event.target.dataset.id});
    //     console.log(typeof event.target.dataset.id);
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            serviceName: options.name,
            price: options.price.split('，'),
            id: options.id,
            picName: this.data.picNameList[options.id]
        });
        wx.setNavigationBarTitle({
            title: options.name
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