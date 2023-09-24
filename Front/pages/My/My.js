/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 21:19:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-09-24 22:25:07
 */
// pages/My/My.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName: '未登录',
        avatar: 'https://www.letmefly.xyz/LetHA/static/pic/expert/000-1.jpg'
    },

    login() {
        function realLogin(nickname, avatar) {
            wx.login({
                success(res) {
                    if (res.code) {
                        wx.request({
                            url: 'https://www.letmefly.xyz/LetHA/login/',
                            data: {
                              code: res.code,
                              nickname: nickname,
                              avatar: avatar
                            },
                            success(res) {
                                console.log(res);
                                wx.showToast({
                                    title: '登录成功！',
                                    icon: 'success',
                                    duration: 1000
                                });
                            }
                        })
                    }
                    else {
                        console.log('登录失败！' + res.errMsg);
                    }
                }
            });
        }

        wx.getUserProfile({
            desc: '获取昵称和头像',
            success: (res) => {
                const nickName = res.userInfo.nickName;
                const avatar = res.userInfo.avatarUrl;
                console.log(nickName);
                console.log(avatar);
                this.setData({nickName: nickName, avatar: avatar});
                wx.setStorage({key: 'nickName', data: nickName});
                wx.setStorage({key: 'avatar', data: avatar});
                realLogin(nickName, avatar);
            },
            fail: () => {
                wx.showToast({
                    title: '获取用户信息失败！',
                    icon: 'error',
                    duration: 1000
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const nickName = wx.getStorageSync('nickName');
        if (nickName) {
            this.setData({nickName: nickName});
        }
        const avatar = wx.getStorageSync('avatar');
        if (avatar) {
            this.setData({avatar: avatar});
        }
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