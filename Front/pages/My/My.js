/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 21:19:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-31 16:46:04
 */
// pages/My/My.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lastUpdateinfoTime: 0,
        avatarURL: '',
        username: '',
    },

    apply2be1caregiver() {
        wx.navigateTo({url: '/pages/Apply2be1Caregiver/Apply2be1Caregiver'});
    },

    gotoUpdateInfo() {
        const clickTime = Date.parse(new Date());  // 模拟器中仅支持秒级的时间戳（后3位都是0）
        var notUpdate = false;
        if (clickTime - this.data.lastUpdateinfoTime < 2000) {
            notUpdate = true;
        }
        this.setData({
            lastUpdateinfoTime: clickTime
        });
        if (notUpdate) {
            wx.showToast({
                title: '点地太快了惹',
                icon: 'error',
                duration: 500
            });
            return ;
        }
        // wx.showToast({
        //     title: '信息更新成功！',
        //     icon: 'success',
        //     duration: 1000
        // });
        wx.navigateTo({url: '/pages/MyAvatarNickname/MyAvatarNickname'});        
    },

    make1phonecall() {
        wx.makePhoneCall({
            phoneNumber: '17795918257',
        });
    },

    friendPage() {
        wx.navigateTo({'url': '/pages/Friend/Friend'});
    },

    gotoOrder(event) {
        const type = event.currentTarget.dataset.type;
        wx.navigateTo({url: '/pages/MyOrder/MyOrder?type=' + type});
    },

    /**
     * 设置头像为localStorage的头像、昵称
     * More: 和/pages/MyAvatarNickname/MyAvatarNickname.js中的setOriginalAvatarAndUsername()一样
     */
    setAvatarAndName() {
        const avatarURL = wx.getStorageSync('avatarURL');
        if (avatarURL) {
            this.setData({avatarURL: avatarURL});
        }
        else {
            const defaultURL = 'https://www.letmefly.xyz/LetHA/static/pic/expert/000-1.jpg';
            this.setData({avatarURL: defaultURL});
            wx.setStorage({key: 'avatarURL', data: defaultURL});
        }
        
        const username = wx.getStorageSync('username');
        if (username) {
            this.setData({username: username});
        }
        else {
            const defaultName = '小程序用户';
            this.setData({username: defaultName});
            wx.setStorage({key: 'username', data: defaultName});
        }
        
        console.log(avatarURL);
        console.log(username);
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
        this.setAvatarAndName();
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
            title: '个人中心 - 西安全心陪诊',
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