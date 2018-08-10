// pages/order/order.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: "all", //finish recover confirm
    orderDetails:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    // utils.http();
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
