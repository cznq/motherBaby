const utils = require('./utils/util.js');
//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var userInfo = {};
    userInfo = wx.getStorageSync('userInfo'); //读取本地userInfo
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // alert()
        this.globalData.code = res.code;
        console.log('res.code', res.code);
        console.log('userInfo', userInfo);
        // 首次登陆调注册接口获取openid&&userid
        if (userInfo == '') {
          console.log('调用注册接口');
          var url = this.globalData.baseUrl + 'maternal/user/register';
          var reqbody = {
            wxcode: res.code
          }
          utils.http(url, (dataStr) => {
            if (dataStr.success) {
              this.globalData.sessionKey = dataStr.data.sessionKey;
              this.globalData.openId = dataStr.data.openId;
              this.globalData.id = dataStr.data.id;
              userInfo = {
                openId: this.globalData.openId,
                userId: this.globalData.id
              }
              wx.setStorageSync('userInfo', userInfo);

            }
          }, reqbody);
        }

        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res.code)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(33333);
          if (userInfo != '') {
            console.log('调用登陆接口');
            var url = this.globalData.baseUrl + 'maternal/user/login';
            console.log('userInfo.openId',userInfo.openId);
            var reqbody = {
              openId: userInfo.openId
            }
            utils.http(url, (dataStr) => {
              if (dataStr.success) {
                console.log('dataStr',dataStr);

              }
            }, reqbody);
          }
      }
    })
  },
  globalData: {
    userInfo: null,
    code: '',
    baseUrl: 'https://nbmp.moji.com/',
    sessionKey: '',
    openId: '',
    id: ''
  }
})
