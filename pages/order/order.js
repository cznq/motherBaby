// pages/order/order.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: "all", //finish recover confirm
    cancelbtn:false,
    orderDetails:[
      {
        orderNo:'555888899',
        start:'待确认',
        weight:'3kg~10kg',
        appointment:'2018-08-09',
        donationInfor:'3kg~10kg,2018-08-09',
        userName:'',
        telNumber:'',
        detailInfo:'',
        markInfo:'',
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
    var url = app.globalData.baseUrl+'maternal/order/list';
    var reqbody = {
      userId:1
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
    util.http(url,(dataStr) => {
      if (dataStr.success) {
        console.log(dataStr);
        console.log(dataStr.data[0].order);
        var orderDetails = dataStr.data[0].order;
      }
    }, reqbody);
  },

  touchTit: function(e) {
    let tag = e.target.dataset.tag;
    switch (tag) {
      case "all":
      // util.http();
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

  cancelbtn:function(){
    var cancelbtn = this.data.cancelbtn;
    if (cancelbtn) {
      this.setData({
        cancelbtn:false
      })
    }else{
      this.setData({
        cancelbtn:true
      })
    }
  },
  queryCancel:function(e) {
    
  }
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
