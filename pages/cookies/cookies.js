// @author lya
const app = getApp();
Page({
  shareId: '',
  /**
   * 页面的初始数据
   */
  data: {
    showInvitation:false,
  },
  bindCloseinvitation(){
    this.setData({
      showInvitation:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    console.log(res.userId)
    if (res.userId) {
      this.setData({
        shareId: res.userId
      })
      wx.showToast({
        title: '用户id为' + this.data.shareId,
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

    var that = this;
    var userId = app.globalData.id;
    console.log('userid', app.globalData.id)
    return {
      title: '邀请好友领积分',
      path: '/pages/cookies/cookies?userId=' + userId, //这里拼接需要携带的参数
      imageUrl: '../../images/share.jpg',
      success: function (res) {
        that.setData({
          showInvitation: true
        })
      }
    }
  }
})