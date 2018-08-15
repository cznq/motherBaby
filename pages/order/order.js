// pages/order/order.js
const app = getApp();
var util = require('../../utils/util.js');
var url = '';
var orderDetails = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: "all", //finish recover confirm
    cancelbtn: false,
    noDetails: false,
    orderDetails: [{
      orderNo: '555888899',
      start: '待确认',
      orderStatus: 1,
      weight: '3kg~10kg',
      appointment: '2018-08-09',
      donationInfor: '3kg~10kg,2018-08-09',
      userName: '莫晓娜',
      telNumber: '17600402888',
      detailInfo: 'xxxxxxxxxxxxx地方',
      markInfo: 'xxxxxxxxxxxxxx',
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    url = app.globalData.baseUrl + 'maternal/order/list';
    var reqbody = {
      userId: 1
    }
    //   userId; //用户id
    // orderNo; //订单号
    // weight; //预估重量
    // appointment; //上门预约时间 yyyy-MM-dd
    // userName; //收货人姓名
    // postalCode; //邮编
    // provinceName; //省份
    // cityName; //城市
    // countyName; //国家
    // detailInfo; //收货详细地址
    // nationalCode; //收货地址国家码
    // telNumber; //收货人电话号码
    // markInfo; //备注信息
    util.http(url, (dataStr) => {
      if (dataStr.success) {
        console.log(dataStr);
        if(!dataStr.data[0]){
          console.log('不存在');
          return false
        }
        console.log(dataStr.data[0].order);
        orderDetails = dataStr.data[0].order;
        this.setData({
          'orderDetails': orderDetails
        })
      }
    }, reqbody);
  },

  touchTit: function(e) {
    let tag = e.target.dataset.tag;
    switch (tag) {
      case "all":
        this.setData({
          'orderTitle': "all"
        });
        url = app.globalData.baseUrl + 'maternal/order/list';
        var reqbody = {
          userId: 1
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log(dataStr);
            if(!dataStr.data[0]){
              console.log('不存在');
              return false
            }
            console.log(dataStr.data[0].order);
            orderDetails = dataStr.data[0].order;
            this.setData({
              'orderDetails': orderDetails
            })
          }
        }, reqbody);
        break;
      case "finish":
        this.setData({
          'orderTitle': "finish"
        });
        url = app.globalData.baseUrl + 'maternal/order/list';
        var reqbody = {
          userId: 1
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log(dataStr);
            if(!dataStr.data[4]){
              console.log('不存在');
              return false
            }
            console.log(dataStr.data[4].order);
            orderDetails = dataStr.data[4].order;
            this.setData({
              'orderDetails': orderDetails
            })
          }
        }, reqbody);
        break;
      case "recover":
        this.setData({
          orderTitle: "recover",
          noDetails: false
        });
        url = app.globalData.baseUrl + 'maternal/order/list';
        var reqbody = {
          userId: 1
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log(dataStr);
            if(!dataStr.data[3]){
              console.log('不存在');
              this.setData({
                noDetails: true
              });
              return false
            }
            console.log(dataStr.data[3].order);
            orderDetails = dataStr.data[3].order;
            this.setData({
              'orderDetails': orderDetails
            })
          }
        }, reqbody);
        break;
      case "confirm":
        this.setData({
          'orderTitle': "confirm"
        });
        url = app.globalData.baseUrl + 'maternal/order/list';
        var reqbody = {
          userId: 1
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log(dataStr);
            if(!dataStr.data[1]){
              console.log('不存在');
              return false
            }
            console.log(dataStr.data[1].order);
            orderDetails = dataStr.data[1].order;
            this.setData({
              'orderDetails': orderDetails
            })
          }
        }, reqbody);
        break;
      default:
        console.log('^………');
    }
  },

  cancelbtn: function() {
    var cancelbtn = this.data.cancelbtn;
    if (cancelbtn) {
      this.setData({
        cancelbtn: false
      })
    } else {
      this.setData({
        cancelbtn: true
      })
    }
  },
  queryCancel: function(e) {
    var url = app.globalData.baseUrl + 'maternal/order/list';
    var reqbody = {
      userId: 1
    }
    util.http(url, (dataStr) => {
      if (dataStr.success) {
        console.log(dataStr);

      }
    }, reqbody);
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
