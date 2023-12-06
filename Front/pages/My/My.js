/*
 * @Author: LetMeFly
 * @Date: 2023-07-03 21:19:26
 * @LastEditors: LetMeFly
 * @LastEditTime: 2023-12-06 23:58:25
 */
// pages/My/My.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    login() {
        const warrant = wx.getStorageSync('warrant');
        if (warrant) {
            return;  // 视为已登录状态
        }
        wx.login({
            success(res) {
                if (!res.code) {
                    wx.showToast({
                        title: '获取用户信息失败',
                        icon: 'error',
                        duration: 1000
                    });
                    return;
                }
                wx.request({
                    url: 'https://www.letmefly.xyz/LetHA/login/',
                    data: {
                        code: res.code
                    },
                    success(res) {
                        const warrant = res.data.warrant;
                        wx.setStorage({key: 'warrant', data: warrant});
                        wx.showToast({
                            title: '登录成功！',
                            icon: 'success',
                            duration: 1000
                        });
                    }
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
        const that = this;

        wx.checkSession({
            success() {

            },
            fail() {
                if (nickName) {  // 说明之前设置过
                    wx.showToast({
                        title: '登录失效，请重新登录',
                        icon: 'error',
                        duration: 1000
                    });
                    wx.removeStorage({key: 'nickName'});
                }
                if (avatar) {
                    wx.removeStorage({key: 'avatar'})
                }
                that.setData({nickName: '未登录', avatar: 'https://www.letmefly.xyz/LetHA/static/pic/expert/000-1.jpg'});
            }
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