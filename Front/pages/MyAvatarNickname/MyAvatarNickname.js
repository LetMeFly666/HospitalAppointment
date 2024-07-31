/*
 * @Author: LetMeFly
 * @Date: 2024-07-30 09:36:18
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-31 16:06:36
 */
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarURL: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        username: '请输入昵称',
        // theme: 'light',
    },

    /**
     * 选择头像
     */
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail;
        this.setData({
            avatarURL: avatarUrl,
        });
    },

    /**
     * 保存头像和昵称并上传到服务器
     */
    onSave() {
        const that = this;
        wx.setStorage({key: 'avatarURL', data: that.avatarUrl});
        wx.setStorage({key: 'username', data: that.username});
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/setAvatarAndNickname/',
            method: 'POST',
            data: { avatarURL: that.avatarURL, nickname: that.username },
            success(response) {
                if (response.data.code == 0) {
                    wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 1000
                    });
                    setTimeout(() => {
                        // wx.navigateTo({url: '/pages/Friend/Friend'});
                        wx.navigateBack();
                    }, 1000);
                }
                else {
                    app.show1toast_error(response.data.msg);
                }
            }
        });
    },

    /**
     * 获取原本的头像和昵称
     * More: 和/pages/My/My.js中的setAvatarAndName()一样
     */
    setOriginalAvatarAndUsername() {
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setOriginalAvatarAndUsername();
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
            title: '头像昵称设置',
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