// pages/home/index.js
let util = require('../../utils/util.js');  
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: util.mformatTime(new Date()),
    memberAddr:[],//
    weightArr: ['5kg以下', '5kg~15kg', '15kg~25kg', '25kg~35kg', '35kg~45kg'],//重量数组
    weightIndex:0,
  },
  // 
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 选择地址
  chooseAddr(){
    let that = this
    wx.chooseAddress({
      success: function (res) {
        let memberAddr = res
        that.setData({
          memberAddr
        })
      }
    })
  },
  // picker组件--重量改变事件
  bindWeightPickerChange(e) {
    this.setData({
      weightIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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