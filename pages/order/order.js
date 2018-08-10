// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: "all", //finish recover confirm
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: "",
    getUserInfo: false,
    nickName: "",
    gender: "",
    city: "",
    province: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    if (app.globalData.code && app.globalData.code != '') {
      console.log('app.code不为空');
    } else {
      app.userInfoReadyCallback = code => {
        if (code != '') {
          console.log('code', code);
        }
      }
    }
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        console.log(res);
        var that = this;
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              _that.setData({
                getUserInfo: true
              })
              console.log(res.userInfo)
            }
          })
        }
      },
    })
  },
  onGotUserInfo: function(e) {
    console.log(e.detail.userInfo);
    let userInfo = e.detail.userInfo;
    if (!userInfo) {
      this.setData({
        getUserInfo: false
      })
    } else {
      this.setData({
        getUserInfo: true
      })
    }

  },
  touchTit: function(e) {
    let tag = e.target.dataset.tag;
    switch (tag) {
      case "all":
        this.setData({
          'orderTitle': "all"
        })
        break;
      case "finish":
        this.setData({
          'orderTitle': "finish"
        })
        break;
      case "recover":
        this.setData({
          'orderTitle': "recover"
        })
        break;
      case "confirm":
        this.setData({
          'orderTitle': "confirm"
        })
        break;
      default:
        console.log('^………');
    }
  },

  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  },
  getPhoneNumber: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
