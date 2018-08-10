// pages/home/index.js
let util = require('../../utils/util.js');  
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',//默认时间
    startDate: util.mformatTime(new Date()),//当前时间
    memberAddr:[],//取件地址
    weightArr: ['请选择', '5kg~15kg', '15kg~25kg', '25kg~35kg', '35kg~45kg'],//重量数组
    weightIndex:0,//默认预估重量下标
    showMModal:false, //是否弹出提示框
    // 轮播图部分
    imgUrls: [
      '../../images/3.png',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    circular:true,
    interval: 2000,
    duration: 1000,
    btnIsable:true,//按钮是否可用
    modalTitle:'',//提示框标题
    modalContent:'', //提示框内容
    modalBtnContent:''//提示框按钮内容
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
      success: function (res) {
        that.setData({
          memberAddr: res
        })
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
    this.setData({
      showMModal: !this.data.showMModal,
      modalTitle: '预约须知',
      modalContent: '内容',
      modalBtnContent:'知道了'
    })
  },
  // 关闭预约须知提示框
  bindCloseModal() {
    this.setData({
      showMModal: false,
    })
  },
  // 确认按钮
  bindConfirmAppointment(e) {
    this.setData({
      showMModal: !this.data.showMModal,
      modalTitle: '预约成功',
      modalContent: '内容',
      modalBtnContent:'好的'
    })
    this.setData({
      weightIndex:0,
      memberAddr:[],
      date:'',
      btnIsable:true
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
  btnIsable(){
    if (this.data.weightIndex != 0 && this.data.memberAddr.length != 0 && this.data.date) {
      this.setData({
        btnIsable: false
      })
    } else {
      this.setData({
        btnIsable: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    // 图片数量大于1时才显示指示点、自动轮播
    this.data.imgUrls.length > 1 ? this.setData({ indicatorDots: !this.data.indicatorDots, autoplay: !this.data.autoplay })
      : this.setData({ indicatorDots: this.data.indicatorDots, autoplay: this.data.autoplay })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  onShareAppMessage: function () {
  
  },

})
