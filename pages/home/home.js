// @author lya

let util = require('../../utils/util.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '请预约', //默认时间
    day:'',
    startDate: util.mformatTime(new Date()), //当前时间
    memberAddr: [], //取件地址
    weightArr: ['3kg以下无法上门取件', '3kg~10kg', '10kg~20kg', '20kg~30kg', '30kg以上'], //重量数组
    weightIndex: 0, //默认预估重量下标
    showMModal: false, //是否弹出提示框
    showTextarea: true,
    // 轮播图部分-开始
    imgUrls: [
      '../../images/banner1.png',
      '../../images/banner2.png',
      '../../images/banner3.png',
    ],
    indicatorDots: false,
    autoplay: false,
    circular: true,
    interval: 3000,
    duration: 1000,
    // 轮播图部分-结束
    btnDisable: true, //按钮是否可用
    modalTitle: '', //提示框标题
    modalContent: '', //提示框内容
    modalBtnContent: '', //提示框按钮内容
    getUserInfo: false,
    customInfo: { //用户信息
      avatarUrl: "",
      nickName: "",
      gender: "",
      city: "",
      province: ''
    },
    showWeightTips: true, //是否显示重量提示
    remarkInfo: '', //备注信息
    showPickup: false,  //是否显示
    showAppointmentsuccess: false, //是否显示预约成功
    changeLine: false, //textarea文字是否换行
    showGift: false,//是否显示新手有礼弹框
    successfulReceipt:false,  //是否显示领取成功提示框
    shareId: '',
    userId:''
  },

  //主动获取用户信息权限
  onGotUserInfo: function (e) {
    // console.log('onGotUserInfo', e.detail.userInfo);
    let that = this
    let userInfo = e.detail.userInfo;
    if (!userInfo) {
      this.setData({
        getUserInfo: false,  
      })
    } else {
      if (!that.data.getUserInfo) {
        if (!app.globalData.id) {
          // 登录
          app.getOpenid(that.data.shareId).then(function (userId) {
            // if (!that.data.shareId){
            //   wx.showToast({
            //     title: '没人分享给我，是我自己来的。我的id是' + app.globalData.id,
            //     icon: 'none'
            //   })
            // }else{
            //   wx.showToast({
            //     title: '分享给我的id为' + shareid + ' ，我的id是' + app.globalData.id,
            //     icon: 'none'
            //   })
            // }    
          })
        }
      }
      console.log('update---',userInfo)

      this.setData({
        getUserInfo: true,
        showGift: false,
        showTextarea: false,
        successfulReceipt: true
      })
    }
  },
  handleGetWeight(){
    let that = this
    util.mHttp(app.globalData.baseUrl + 'maternal/system/weight', {}, function (data) {
      if (data.success) {
        let weightArr = []
        Object.keys(data.data).forEach(function (key) {
          weightArr.push(data.data[key])
        });
        that.setData({
          weightArr: weightArr
        })
      }
    }, 'POST', {
        'content-type': 'application/x-www-form-urlencoded'
      })
  },
  // picker组件--重量改变事件
  bindWeightPickerChange(e) {
    this.setData({
      weightIndex: e.detail.value
    })
    this.btnIsable()
  },

  // 选择地址
  bindChooseAddr() {
    let that = this
    wx.chooseAddress({
    success(res) {
        if (!res.provinceName.includes('北京')) {
          that.setData({
            showPickup: true,
            showTextarea: false
          })
        } else {
          that.setData({
            showPickup: false,
            showTextarea: true,
            memberAddr: res
          })
          console.log('suc-----app.globalData.id', app.globalData.id)
          if (app.globalData.id){
            util.mHttp(app.globalData.baseUrl + 'maternal/address/add', {
              userId: app.globalData.id, //用户id
              userName: that.data.memberAddr.userName, //收货人姓名
              postalCode: that.data.memberAddr.postalCode, //邮编
              provinceName: that.data.memberAddr.provinceName, //省份
              cityName: that.data.memberAddr.cityName, //城市
              countyName: that.data.memberAddr.countyName, //区县
              detailInfo: that.data.memberAddr.detailInfo, //收货详细地址
              nationalCode: that.data.memberAddr.nationalCode, //收货地址国家码
              telNumber: that.data.memberAddr.telNumber, //收货人电话号码
            }, function (data) {
              if (data.success) {
                console.log(data)
              }
            }, 'POST', {
                'content-type': 'application/x-www-form-urlencoded'
              })
          }
        }
      },
      fail(res) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.address']) {
              wx.openSetting({
                success(res) {
                  res.authSetting = {
                    "scope.address": true,
                  }
                }
              })
            }
          }
        })
      },
      complete(res){  
        that.btnIsable()
      }
    })
  },
  // 设置上门时间
  bindDateChange(e) {
    let day = ''
    if (new Date(e.detail.value).getDay() === 1) {
      day = '（周一）'
    } else if (new Date(e.detail.value).getDay() === 2) {
      day = '（周二）'
    } else if (new Date(e.detail.value).getDay() === 3) {
      day = '（周三）'
    } else if (new Date(e.detail.value).getDay() === 4) {
      day = '（周四）'
    } else if (new Date(e.detail.value).getDay() === 5) {
      day = '（周五）'
    } else if (new Date(e.detail.value).getDay() === 6) {
      day = '（周六）'
    } else if (new Date(e.detail.value).getDay() === 0) {
      day = '（周日）'
    }
    this.setData({
      day:day,
      date: e.detail.value
    })
    this.btnIsable()
  },
  // 预约须知提示框
  bindAppointmentNotice() {
    this.setData({
      showMModal: !this.data.showMModal,
      showTextarea: false,
      modalTitle: '预约须知',
      modalContent: '内容',
      modalBtnContent: '知道了'
    })
  },
  bindCloseAppointment() {
    this.setData({
      showMModal: false,
      showTextarea: true,
      showAppointmentsuccess: false,
      remarkInfo: ''
    })
  },
  // 关闭预约须知提示框
  bindCloseModal() {
    this.setData({
      showMModal: false,
      showTextarea: true,
    })
  },
  bindinput(e) {
    this.setData({
      remarkInfo: e.detail.value
    })
  },
  bindlinechange(e) {
    // console.log(e)
    if (e.detail.lineCount == '2' || e.detail.lineCount == '3') {
      this.setData({
        changeLine: true
      })
    } else if (e.detail.lineCount == '1' ) {
      this.setData({
        changeLine: false
      })
    }
  },
  // 点击我的预约
  bindMymAppointment() {
    var _that = this;
    if (_that.data.getUserInfo){
      if (app.globalData.id) {
        wx.navigateTo({
          url: '../order/order'
        })
      }
    }
  },
  bindCloseSuccessfulReceipt(){
    this.setData({
      successfulReceipt:false
    })
  },
  bindMyCookies(e){
    if (this.data.getUserInfo){
      wx.navigateTo({
        url: '../cookies/cookies',
      })
    }
  },
  // 确认按钮
  bindConfirmAppointment(e) {
    let that = this
    console.log('userId', app.globalData.id)
    console.log('weight', parseInt(that.data.weightIndex)+1)
    console.log('appointment', that.data.date)
    console.log('userName', that.data.memberAddr.userName)
    console.log('postalCode', that.data.memberAddr.postalCode)
    console.log('provinceName', that.data.memberAddr.provinceName)
    console.log('cityName', that.data.memberAddr.cityName)
    console.log('countyName', that.data.memberAddr.provinceName)
    console.log('detailInfo', that.data.memberAddr.detailInfo)
    console.log('nationalCode', that.data.memberAddr.nationalCode)
    console.log('telNumber', that.data.memberAddr.telNumber)
    console.log('markInfo', that.data.remarkInfo)
    if (!this.data.btnDisable) {
      if (!app.globalData.id) {  
        // console.log('无userId');
        // 登录
        app.getOpenid().then(function (userId) {
          console.log('userId', userId);
          if (userId) {
            // 订单预约请求

            util.mHttp(app.globalData.baseUrl + 'maternal/order/appointment', {
              userId: app.globalData.id, //用户id
              // userId: 2 , //用户id
              // weight: that.data.weightArr[that.data.weightIndex], //预估重量
              weight: parseInt(that.data.weightIndex) + 1, //预估重量
              appointment: that.data.date, //上门预约时间 yyyy-MM-dd
              userName: that.data.memberAddr.userName, //收货人姓名
              postalCode: that.data.memberAddr.postalCode, //邮编
              provinceName: that.data.memberAddr.provinceName, //省份
              cityName: that.data.memberAddr.cityName, //城市
              countyName: that.data.memberAddr.countyName, //区县
              detailInfo: that.data.memberAddr.detailInfo, //收货详细地址
              nationalCode: that.data.memberAddr.nationalCode, //收货地址国家码
              telNumber: that.data.memberAddr.telNumber, //收货人电话号码
              markInfo: that.data.remarkInfo //备注信息
            }, function (data) {
              console.log('suc', data)
              if (data.success) {
                that.setData({
                  weightIndex: 0, //数组重量下标
                  memberAddr: [], //收获地址
                  date: '请预约', //日期
                  btnDisable: true, //免费上门取货按钮是否可用
                  remarkInfo: '', //备注信息
                  showWeightTips: true,  //是否显示重量提示
                  showAppointmentsuccess: true, //是否显示预约成功提示框
                  showTextarea: false, //是否显示textarea
                  day:''
                })
              }
            }, 'POST', {
                'content-type': 'application/x-www-form-urlencoded'
              })
          }
        })
      } else {
        // console.log('有userId');
        // 订单预约请求
        util.mHttp(app.globalData.baseUrl + 'maternal/order/appointment', {
          userId: app.globalData.id, //用户id
          // userId: 2 , //用户id
          weight: parseInt(that.data.weightIndex) + 1, //预估重量
          appointment: that.data.date, //上门预约时间 yyyy-MM-dd
          userName: that.data.memberAddr.userName, //收货人姓名
          postalCode: that.data.memberAddr.postalCode, //邮编
          provinceName: that.data.memberAddr.provinceName, //省份
          cityName: that.data.memberAddr.cityName, //城市
          countyName: that.data.memberAddr.countyName, //区县
          detailInfo: that.data.memberAddr.detailInfo, //收货详细地址
          nationalCode: that.data.memberAddr.nationalCode, //收货地址国家码
          telNumber: that.data.memberAddr.telNumber, //收货人电话号码
          markInfo: that.data.remarkInfo //备注信息
        }, function (data) {
          console.log('suc', data)
          if (data.success) {
            that.setData({
              weightIndex: 0,
              memberAddr: [],
              date: '请预约',
              btnDisable: true,
              remarkInfo: '',
              showWeightTips: true,
              showAppointmentsuccess: true,
              showTextarea: false
            })
          }
        }, 'POST', {
            'content-type': 'application/x-www-form-urlencoded'
          })
      }
    }

  },
  // 设置导航条颜色
  setNavigationBarColor(bgcolor) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: bgcolor,
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      }
    })
  },
  bindCopy() {
    wx.setClipboardData({  
      data: 'dark-artist',
      success: function (res) {
        wx.hideToast()
      },
      complete(){
        wx.showToast({
          title: '客服微信已复制',
        })
      }
    })
  },
  // 判断按钮是否可用
  btnIsable() {
    if (this.data.weightIndex != 0 && this.data.memberAddr.length !=0&& this.data.date!='请预约') {
      this.setData({
        btnDisable: false
      })
    } else {
      this.setData({
        btnDisable: true
      })
    }
    if (this.data.weightIndex) {
      this.setData({
        showWeightTips: false
      })
    }
  },
  bindHideModal() {
    this.bindChooseAddr()
  },
  bindDelete(e) {
    this.setData({
      showPickup: false,
      showTextarea: true,
      successfulReceipt:false,
      showTextarea:true,
      showGift:false
    })
  },
  handleGetGift(){
    this.setData({
      successfulReceipt: true,
      showTextarea:false      
    })
  },
  handleViewCookies(){
    this.setData({
      successfulReceipt: false,
      showTextarea: true
    })
    wx.navigateTo({
      url: '../cookies/cookies'
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.weightIndex+1+'')
    if (options.userId) {
      this.setData({
        shareId: options.userId
      })
      console.log('userid',app.globalData.id)
      console.log('shareId', this.data.shareId)
    }
    // console.log('day', new Date().getDay())
    var _that = this;
    wx.getSetting({ // 查看是否授权
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              _that.setData({
                getUserInfo: true
              })
              // 更新用户信息
              var url = app.globalData.baseUrl + 'maternal/user/update';
              var reqbody = {
                id: app.globalData.id,
                nickName: res.userInfo.nickName,
                headSculpture: res.userInfo.avatarUrl,
                gender: res.userInfo.gender,
                openId: app.globalData.openId,
                country: res.userInfo.country,
                province: res.userInfo.province,
                city: res.userInfo.city,
                mobile: '',
                markInfo:''
              }
              util.http(url, (dataStr) => {
                if (dataStr.success) {
                  app.globalData.sessionKey = dataStr.data.sessionKey;
                  app.globalData.openId = dataStr.data.openId;
                }
              }, reqbody);
            }
          })
        }else{   //如果未授权则显示新手有礼提示框
          _that.setData({
            showGift:true
          })
        }
      }
    })

    // 图片数量大于1时才显示指示点、自动轮播
    this.data.imgUrls.length > 1 ? this.setData({
      indicatorDots: !this.data.indicatorDots,
      autoplay: !this.data.autoplay
    }) :
      this.setData({
        indicatorDots: this.data.indicatorDots,
        autoplay: this.data.autoplay
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '享换换',
      imageUrl: '../../images/share.jpg'
    }
  }
})
