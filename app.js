const utils = require('./utils/util.js');
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // alert()
        this.globalData.code = res.code;
        console.log('res.code',res.code);
        // var url = this.globalData.baseUrl+'maternal/user/register?wxcode='+ res.code;
        var url = this.globalData.baseUrl+'maternal/user/register';
        var reqbody = {
          wxcode: res.code
        }
        utils.http(url,(dataStr) => {
          if (dataStr.success) {
            console.log(dataStr);
            this.globalData.sessionKey = dataStr.data.sessionKey;
            this.globalData.openId = dataStr.data.openId;
            this.globalData.id = dataStr.data.id;
          }

        }, reqbody);
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res.code)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // if (res.authSetting['scope.userInfo']) {
        //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //   wx.getUserInfo({
        //     success: res => {
        //       // 可以将 res 发送给后台解码出 unionId
        //       this.globalData.userInfo = res.userInfo
        //     }
        //   })
        // }
      }
    })
  },
  globalData: {
    userInfo: null,
    code:'',
    baseUrl:'http://192.168.1.199:8099/',
    sessionKey:'',
    openId:'',
    id:''
  }
})
