/* @author lya */

// pages/service/index.js 联系客服页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1:false,
    show2:false,
    show3:false,
    show4:false,
    show5:false,
    show6:false,
    show7:false,
    show8:false,
    show9:false,
  },
  bindContent1(){
    let that =this
    this.setData({
      show1:!that.data.show1
    })
  },
  bindContent2() {
    let that = this
    this.setData({
      show2: !that.data.show2
    })
  },
  bindContent3() {
    let that = this
    this.setData({
      show3: !that.data.show3
    })
  },
  bindContent4() {
    let that = this
    this.setData({
      show4: !that.data.show4
    })
  },
  bindContent5() {
    let that = this
    this.setData({
      show5: !that.data.show5
    })
  },
  bindContent6() {
    let that = this
    this.setData({
      show6: !that.data.show6
    })
  },
  bindContent7() {
    let that = this
    this.setData({
      show7: !that.data.show7
    })
  },
  bindContent8() {
    let that = this
    this.setData({
      show8: !that.data.show8
    })
  },
  bindContent9() {
    let that = this
    this.setData({
      show9: !that.data.show9
    })
  },
  bindSaveImg(){
    wx.saveImageToPhotosAlbum({
      filePath: 'images/qrcode.png',
      success: function (res) {
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: function (res) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.openSetting({
                success(res) {
                  res.authSetting = {
                    "scope.writePhotosAlbum": true,
                  }
                }
              })
            }
          }
        })
      }
    })
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '联系客服',
      imageUrl: '../../images/share.jpg'
    }
  }
})