const utils = require('./utils/util.js');
//app.js
App({
  onLaunch: function() {
    var userInfo = {};
    userInfo = wx.getStorageSync('userInfo'); //读取本地userInfo
    // 获取用户信息
    wx.getSetting({
      success: res => {
          if (userInfo != '') {
            console.log('调用登陆接口');
            var url = this.globalData.baseUrl + 'maternal/user/login';
            // console.log('userInfo.openId',userInfo.openId);
            var reqbody = {
              openId: userInfo.openId
            }
            utils.http(url, (dataStr) => {
              if (dataStr.success) {
                // console.log('dataStr',dataStr);
              this.globalData.openId = dataStr.data.openId;
              this.globalData.sessionKey = dataStr.data.sessionKey;
              this.globalData.id = dataStr.data.id;
              // console.log('this.globalData.id',this.globalData.id);
              }
            }, reqbody);
          }
      }
    })
  },
  getOpenid:function(){
    var userInfo = {};
    userInfo = wx.getStorageSync('userInfo');
    var _that = this;
    return new Promise(function(resolve, reject) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('res.coded',res.code);
          _that.globalData.code = res.code;
          // 首次登陆调注册接口获取openid&&userid
          if (!userInfo) {
            console.log('主动注册接口');
            var url = _that.globalData.baseUrl + 'maternal/user/register';
            var reqbody = {
              wxcode: res.code
            }
            utils.http(url, (dataStr) => {
              if (dataStr.success) {
                _that.globalData.sessionKey = dataStr.data.sessionKey;
                _that.globalData.openId = dataStr.data.openId;
                _that.globalData.id = dataStr.data.id;
                // console.log('dataStr.data.id',dataStr.data.id);
                userInfo = {
                  openId: _that.globalData.openId,
                  userId: _that.globalData.id
                }
                wx.setStorageSync('userInfo', userInfo);
                // console.log('userInfo2',userInfo);
                resolve(userInfo);
              }else {
                // console.log('失败',dataStr);
              }
            }, reqbody);
          }else{
            resolve(userInfo);
          }
        }
      })
    });
  },
  globalData: {
    userInfo: null,
    code: '',
    // baseUrl: 'https://nbmp.moji.com/',
    baseUrl: 'http://192.168.1.199:8099/',
    sessionKey: '',
    openId: '',
    id: ''
  }
})
