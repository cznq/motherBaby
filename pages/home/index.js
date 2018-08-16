// pages/home/index.js
let util = require('../../utils/util.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '请预约', //默认时间
    startDate: util.mformatTime(new Date()), //当前时间
    memberAddr: [], //取件地址
    weightArr: ['请选择', '5kg~15kg', '15kg~25kg', '25kg~35kg', '35kg~45kg'], //重量数组
    weightIndex: 0, //默认预估重量下标
    showMModal: false, //是否弹出提示框
    // 轮播图部分-开始
    imgUrls: [
      '../../images/3.png',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    circular: true,
    interval: 2000,
    duration: 1000,
    // 轮播图部分-结束
    btnIsable: true, //按钮是否可用
    modalTitle: '', //提示框标题
    modalContent: '', //提示框内容
    modalBtnContent: '', //提示框按钮内容
    getUserInfo: false,
    customInfo:{  //用户信息
      avatarUrl: "",
      nickName: "",
      gender: "",
      city: "",
      province: ''
    },
    showWeightTips:true, //是否显示重量提示
    remarkInfo:'' ,//备注信息
    navigate:false
  },

  //主动获取用户信息权限
  onGotUserInfo: function(e) {
    console.log('onGotUserInfo',e.detail.userInfo);
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
  // picker组件--重量改变事件
  bindWeightPickerChange(e) {
    this.setData({
      weightIndex: e.detail.value
    })
    this.btnIsable()
  },
  // auth(){
  //   let that =this
  //   wx.getSetting({
  //     success: res => {
  //       //这里打印res 得到authSetting数组里scope 三条相关信息都是true 如果拒绝授权 res.authSetting['scope.userInfo'] == false 下面再次调起授权
  //       if (res.authSetting['scope.address'] == false) {
  //         wx.showModal({
  //           title: '警告',
  //           content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
  //           success: function (e) {
  //             wx.getSetting({
  //               success: event => {
  //                 console.log('suc',event);
  //                 //得到authSetting数组里scope 三条相关信息都是true 授权成功
  //                 // that.bindChooseAddr()

  //               }
  //             });
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // 选择地址
  bindChooseAddr() {
    let that = this
    // this.auth()
    wx.chooseAddress({
      success(res) {
        if (!res.provinceName.includes('北京')){
          wx.showToast({
            title: '目前只支持北京市内哦',
            icon:'none',
            duration:2000
          })
          that.bindChooseAddr()
        }else{
          console.log('北京市')
        }
        that.setData({
          memberAddr: res
        })
      },
      fail(res){
        console.log('fail',res)
        // that.bindChooseAddr()
      }
    })
    this.btnIsable()
  },
  // 设置上门时间
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    this.btnIsable()
  },
  // 预约须知提示框
  bindAppointmentNotice() {
    // wx.setClipboardData({
    //   data: '123',
    //   success: function (res) {
    //     wx.getClipboardData({
    //       success: function (res) {
    //         console.log(res.data) // data
    //       }
    //     })
    //   }
    // })
    this.setData({
      showMModal: !this.data.showMModal,
      modalTitle: '预约须知',
      modalContent: '内容',
      modalBtnContent: '知道了'
    })
  },
  // 关闭预约须知提示框
  bindCloseModal() {
    this.setData({
      showMModal: false,
      navigate:false
    })
  },
  bindinput(e){
    this.setData({
      remarkInfo: e.detail.value
    })
  },
  // 确认按钮
  bindConfirmAppointment(e) {
    let that = this
    // console.log('userId',app.globalData.id);
    // console.log('weight',that.data.weightArr[that.data.weightIndex]);
    // console.log('appointment',that.data.date);
    // console.log('userName',that.data.memberAddr.userName);
    // console.log('postalCode',that.data.memberAddr.postalCode);
    // console.log('provinceName',that.data.memberAddr.provinceName);
    // console.log('cityName',that.data.memberAddr.cityName);
    // console.log('countyName',that.data.memberAddr.countyName);
    // console.log('detailInfo',that.data.memberAddr.detailInfo);
    // console.log('nationalCode',that.data.memberAddr.nationalCode);
    // console.log('telNumber',that.data.memberAddr.telNumber);
    // console.log('markInfo',that.data.remarkInfo);
    // 订单预约请求
    util.mHttp(app.globalData.baseUrl +'maternal/order/appointment',{
      userId: app.globalData.id, //用户id
      weight: that.data.weightArr[that.data.weightIndex], //预估重量
      appointment: that.data.date, //上门预约时间 yyyy-MM-dd
      userName: that.data.memberAddr.userName, //收货人姓名
      postalCode: that.data.memberAddr.postalCode,//邮编
      provinceName: that.data.memberAddr.provinceName, //省份
      cityName: that.data.memberAddr.cityName,//城市
      countyName: that.data.memberAddr.countyName,//区县
      detailInfo: that.data.memberAddr.detailInfo ,//收货详细地址
      nationalCode: that.data.memberAddr.nationalCode, //收货地址国家码
      telNumber: that.data.memberAddr.telNumber , //收货人电话号码
      markInfo:that.data.remarkInfo //备注信息
    },function(data){
      console.log('suc',data)
      if(data.success){
        // console.log('suc')
        that.setData({
          showMModal: !that.data.showMModal,
          modalTitle: '预约成功',
          modalContent: '内容',
          modalBtnContent: '好的',
          weightIndex: 0,
          memberAddr: [],
          date: '请预约',
          btnIsable: true,
          remarkInfo:'',
          navigate:true,
          showWeightTips:true
        })
      }else{
        // console.log('error')
      }
      }, 'POST',{
        'content-type': 'application/x-www-form-urlencoded'
      })
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
  // 判断按钮是否可用
  btnIsable() {
    if (this.data.weightIndex != 0 && this.data.memberAddr.length != 0 && this.data.date) {
      this.setData({
        btnIsable: false
      })
    } else {
      this.setData({
        btnIsable: true
      })
    }
    if(this.data.weightIndex!=0){
      this.setData({
        showWeightTips:false
      })
    }else{
      this.setData({
        showWeightTips: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    if (app.globalData.code && app.globalData.code != '') {
      // console.log('code','app.code不为空');
    } else {
      var userInfo = {};
      userInfo = wx.getStorageSync('userInfo'); //读取本地userInfo
      if (userInfo == '') {
        app.userInfoReadyCallback = code => {
          if (code != '') {
            console.log('code', code);
            var url = app.globalData.baseUrl + 'maternal/user/register';
            var reqbody = {
              wxcode: code
            }
            util.http(url, (dataStr) => {
              if (dataStr.success) {
                console.log('success', dataStr);
                app.globalData.sessionKey = dataStr.data.sessionKey;
                app.globalData.openId = dataStr.data.openId;
                app.globalData.id = dataStr.data.id
                userInfo = {
                  openId: app.globalData.openId,
                  userId: app.globalData.id
                }
                wx.setStorageSync('userInfo', userInfo);
              }

            }, reqbody);
          }
        }
      }
    }
    wx.getSetting({// 查看是否授权
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              _that.setData({
                getUserInfo: true
              })
              // console.log('suc',res.userInfo);
              // 更新用户信息
              var url = app.globalData.baseUrl+'maternal/user/update';
              var reqbody = {
                id: app.globalData.id,
                nickName:res.userInfo.nickName,
                headSculpture:res.userInfo.avatarUrl,
                gender:res.userInfo.gender,
                openId:app.globalData.openId,
                country:res.userInfo.country,
                province:res.userInfo.province,
                city:res.userInfo.city,
                mobile:''
              }
              util.http(url,(dataStr) => {
                // console.log(dataStr);
                if (dataStr.success) {
                  // console.log('更新用户信息',dataStr);
                  app.globalData.sessionKey = dataStr.data.sessionKey;
                  app.globalData.openId = dataStr.data.openId;
                }
              }, reqbody);

            }
          })
        }
      },
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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

  },

})
