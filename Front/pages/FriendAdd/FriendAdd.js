// pages/FriendAdd/FriendAdd.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        if18: '',
        name: '',
        sex: '',
        phone: '',
        idcard: '',
        relations: ['本人', '父母', '子女', '兄弟姐妹', '夫妻', '其他'],  // 若要改，勿忘后端
        relation: '本人',
        relationIndex: 0
    },

    save1friend() {
        const if18 = this.data.if18;
        if (!if18) {
            app.show1toast_error('是否18周岁？');
            return;
        }
        const name = this.data.name;
        if (!name) {
            app.show1toast_error('姓名是？');
            return;
        }
        if (name.length < 2) {
            app.show1toast_error('姓名最多2字');
            return;
        }
        if (name.length > 16) {
            app.show1toast_error('姓名最多16字');
            return;
        }
        const sex = this.data.sex;
        if (!sex) {
            app.show1toast_error('性别是？');
            return;
        }
        const phone = this.data.phone;
        if (phone.length < 6) {
            app.show1toast_error('电话最少6位');
            return;
        }
        if (phone.length > 32) {
            app.show1toast_error('电话最多32位');
            return;
        }
        const idcard = this.data.idcard;
        if (idcard.length < 10) {  // 护照最少也得10位吧
            app.show1toast_error('身份证过短');
            return;
        }
        if (idcard.length > 32) {
            app.show1toast_error('身份证过长');
            return;
        }
        const relation = this.data.relation;
        if (this.data.relations.indexOf(relation) == -1) {
            app.show1toast_error('怎么选地关系');
            return;
        }
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/add1friend/',
            method: 'POST',
            data: {
                if18: if18,
                name: name,
                sex: sex,
                phone: phone,
                idcard: idcard,
                relation: relation
            },
            success(response) {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                });
                setTimeout(() => {
                    // wx.navigateTo({url: '/pages/Friend/Friend'});
                    wx.navigateBack();
                }, 1000);
            },
        });
    },

    set1newValue(valueName) {  // Oh no, wx-mini not support this
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

    inputidcard(event) {
        const val = event.detail.value;
        this.setData({
            idcard: val
        });
    },

    pick1relation(event) {
        const val = event.detail.value;
        this.setData({
            relationIndex: val,
            relation: this.data.relations[val]
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

    shareData() {
        const that = this;
        return {
            title: '添加就诊人',
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