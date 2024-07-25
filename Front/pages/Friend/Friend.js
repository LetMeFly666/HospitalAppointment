/*
 * @Author: LetMeFly
 * @Date: 2023-12-14 19:31:00
 * @LastEditors: LetMeFly
 * @LastEditTime: 2024-07-25 12:23:45
 */
// pages/Friend/Friend.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        friends: [{
            name: '王小美',
            id: '1212'
        }, {
            name: '牛杂师傅',
            id: '12125'
        }, {
            name: '吏小依',
            id: '232'
        }, {
            name: '吏小贰',
            id: '2333'
        }, {
            name: '吏小傪',
            id: '1432125'
        }, {
            name: '吏小寺',
            id: '1525'
        }, {
            name: '吏小武',
            id: '44'
        }, {
            name: '吏小鎏',
            id: '23156'
        }, {
            name: '吏小妻',
            id: '7955'
        }, {
            name: '吏小芭',
            id: '797'
        }, {
            name: '吏小久',
            id: '15'
        }, {
            name: '吏小史',
            id: '96'
        },]
    },

    delete1friend(event) {
        const id = event.currentTarget.dataset.id;
        const that = this;
        wx.showModal({
            title: '警告',
            content: '确认要删除吗',
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    app.myRequest({
                        url: 'https://www.letmefly.xyz/LetHA/user/delete1friend/',
                        method: 'POST',
                        data: {
                            'id': id
                        },
                        success(response) {
                            that.getFriends();
                        }
                    });
                } else {
                    console.log('不删了');
                }
            }
        })
    },

    add1friend() {
        wx.redirectTo({'url': '/pages/FriendAdd/FriendAdd'});
    },

    getFriends() {
        const that = this;
        app.myRequest({
            url: 'https://www.letmefly.xyz/LetHA/user/getFriends/',
            success(response) {
                const data = response.data['data'];
                that.setData({
                    friends: data
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getFriends();
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
            title: '管理我的就诊人',
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