// pages/order/order.js
const app = getApp();
var util = require('../../utils/util.js');
var url = '';
var orderDetails = [];
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/order/order'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: "all", //finish recover confirm
    cancelbtn: false,
    noDetails: false,
    orderDetails: [],
    currentOrderNo: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    if (app.globalData.id) {
      // wx.showToast({
      //   title:'code不为空'+app.globalData.id
      // })
    }

    console.log('globalData.id',app.globalData.id);
    url = app.globalData.baseUrl + 'maternal/order/list';
    var reqbody = {
      userId: app.globalData.id
    }
    util.http(url, (dataStr) => {
      this.setData({
        noDetails: false
      })
      if (dataStr.success) {
        console.log('ddd', dataStr);
        if (!dataStr.data[0]) {
          console.log('不存在');
          this.setData({
            noDetails: true
          })
          return false;
        }
        console.log(dataStr.data[0].order);
        orderDetails = dataStr.data[0].order;
        this.setData({
          'orderDetails': orderDetails
        })
      }else {
        console.log('userId为空');
        this.setData({
          noDetails: true
        })
      }
    }, reqbody);
  },

  touchTit: function(e) {
    let tag = e.target.dataset.tag;
    switch (tag) {
      case "all":
        this.setData({
          orderTitle: "all",
          noDetails: false
        });
        url = app.globalData.baseUrl + 'maternal/order/list';
        var reqbody = {
          userId: app.globalData.id
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log(dataStr);
            if (!dataStr.data[0] || dataStr.data[0].type != 0) {
              console.log('不存在');
              this.setData({
                noDetails: true
              })
              return false;
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
          'orderTitle': "finish",
          noDetails: false
        });
        url = app.globalData.baseUrl + 'maternal/order/list';
        var reqbody = {
          userId: app.globalData.id
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log(dataStr);
            console.log(dataStr.data[4]);
            if (!dataStr.data[4]) {
              console.log(3333);
              this.setData({
                noDetails: true,
                'orderDetails': []
              })
              return false;
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
          userId: app.globalData.id
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log('待回收',dataStr);
            if (!dataStr.data[3] || dataStr.data[3].type != 3) {
              this.setData({
                noDetails: true,
                orderDetails: []
              });
              return false;
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
          orderTitle: "confirm",
          noDetails: false
        });
        url = app.globalData.baseUrl + 'maternal/order/list';
        var reqbody = {
          userId: app.globalData.id
        }
        util.http(url, (dataStr) => {
          if (dataStr.success) {
            console.log('待确认',dataStr);
            if (!dataStr.data[1] || dataStr.data[1].type != 1) {
              console.log('不存在');
              this.setData({
                noDetails: true,
                orderDetails: []
              })
              return false;
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

  cancelbtn: function(e) {
    var orderno = e.currentTarget.dataset.orderno;
    this.setData({
      currentOrderNo: orderno
    })
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
  cancelTxt: function() {
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
    var url = app.globalData.baseUrl + 'maternal/order/cancel';
    var reqbody = {
      id: this.data.currentOrderNo
    }
    util.http(url, (dataStr) => {
      if (dataStr.success) {
        if(this.data.orderTitle ==='all'){
          /////拉去全部数据
          var _that = this;
          url = app.globalData.baseUrl + 'maternal/order/list';
          var reqbody = {
            userId: app.globalData.id
          }
          util.http(url, (dataStr) => {
            this.setData({
              noDetails: false
            })
            if (dataStr.success) {
              console.log('ddd', dataStr);
              if (!dataStr.data[0]) {
                console.log('不存在');
                this.setData({
                  noDetails: true
                })
                return false;
              }
              console.log(dataStr.data[0].order);
              orderDetails = dataStr.data[0].order;
              this.setData({
                'orderDetails': orderDetails
              })
            }
          }, reqbody);
          ////
        }else{
          console.log(33333);
          url = app.globalData.baseUrl + 'maternal/order/list';
          var reqbody = {
            userId: app.globalData.id
          }
          util.http(url, (dataStr) => {
            if (dataStr.success) {
              console.log('取消成功后取得待确认data[1]',dataStr);
              console.log(dataStr.data[1].type);
              if (!dataStr.data[1] || dataStr.data[1].type != 1) {
                console.log('不存在');
                this.setData({
                  noDetails: true,
                  orderDetails: []
                })
                return false;
              }
              orderDetails = dataStr.data[1].order;
              console.log('dataStr',dataStr);
              this.setData({
                'orderDetails': orderDetails
              })
            }
          }, reqbody);
        }

        this.setData({
          cancelbtn: false
        });
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000
        })
      }
    }, reqbody);
  },
  yjz:function(){
    wx.navigateTo({
      url: '../home/index',
    })
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
