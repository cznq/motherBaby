// @author lya
let util = require('../../utils/util.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showInvitation:false,
    showRules:false,
    points:0,
    pointsList:[]
  },
  bindCloseinvitation(){
    this.setData({
      showInvitation:false
    })
  },
  handleShowRules(){
    this.setData({
      showRules:true
    })
  },
  handleCloseRules(){
    this.setData({
      showRules: false
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv) //加密算法的初始向量
    console.log(e.detail.encryptedData)   //包括敏感数据在内的完整用户信息的加密数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    let that  = this
    console.log('cookies_id',app.globalData.id)
    if (app.globalData.id) {
      util.mHttp(app.globalData.baseUrl + 'maternal/user/points', {
        userId: app.globalData.id, //用户id
      }, function (data) {
        if (data.success) {
          console.log(data)
          that.setData({
            points: data.data.points, 
            pointsList: data.data.pointsList
          })
        }
      }, 'POST', {
          'content-type': 'application/x-www-form-urlencoded'
        })
    }
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
    let that = this;
    that.setData({
      showInvitation: false
    })
    var userId = app.globalData.id;
    console.log('userid', app.globalData.id)
    return {
      title: '送你160枚小饼干，免费领宝贝',
      path: '/pages/home/home?userId=' + userId , //这里拼接需要携带的参数userId
      imageUrl: '../../images/share.jpg',
      success (res) {
        that.setData({
          showInvitation: true
        })
      },
      fail(res){
        // that.setData({
        //   showInvitation: false
        // })
        // wx.showToast({
        //   title: '用户取消了邀请',
        // })
      }
    }
  }
})