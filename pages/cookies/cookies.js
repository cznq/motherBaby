// @author lya
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showInvitation:false,
    showRules:false
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {

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
      title: '邀请好友领积分',
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