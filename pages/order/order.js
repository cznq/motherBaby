// pages/order/order.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: "all", //finish recover confirm
    orderDetails:[
      {
        orderId:'555888899',
        start:'待确认',
        donationInfor:'3kg~10kg,2018-08-09',
        addInfor:{
          name:'莫晓娜',
          paperInfo:'3545454242532',
          address:'xxxxxxxxxxxxx地方'
        }
      },
      {
        orderId:'22222222222',
        start:'待确认',
        donationInfor:'3kg~10kg,2018-08-09',
        addInfor:{
          name:'莫晓娜',
          paperInfo:'3545454242532',
          address:'xxxxxxxxxxxxx地方'
        }
      }
    ],
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
      // utils.http();
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
