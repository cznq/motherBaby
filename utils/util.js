const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const mformatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()+1
  return [year, month, day].map(mformatNumber).join('-')
}

const mformatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 获取数据模块
 *
 * @param    {string}  url                 服务器地址
 * @param    {string}  callback             回调函数
 * @param    {Object}  reqbody             请求参数
 * @returns  void
 *
 * @date     2018-08-10
 * @author   wzj
 */
function http(url, callBack, reqbody) {
  wx.showLoading({
    title: '加载中',
  })
  var reqbody = reqbody ? reqbody : {};
  wx.request({
    url: url,
    data: reqbody,
    method: 'GET',
    header: {
      'content-type': 'json'
    },
    success: function(res) {
      wx.hideLoading();
      callBack(res.data);
    },
    fail: function(error) {
      wx.hideLoading();
      console.log(error)
    }
  })
}
// 请求
function mHttp(url, data = {}, callBack, method = 'get', header = { 'content-type': 'application/json'}) {
  wx.request({
    url,
    data,
    method,
    header,
    success(res) {
      callBack(res.data);
    },
    fail(res) {
     console.log(res)
    }
  })
}
module.exports = {
  formatTime,
  mformatTime,
  http,
  mHttp
}



//   < view class='home-modal' wx: if= '{{!showMModal}}' >
//     <!--预约须知模态框 -->
//       <view class='modal-appointment-notice  font28' >
//         <!--标题 -->
//           <view class='modal-appointment-notice-title' > 预约须知 < /view>
//             < !--内容 -->
//               <view class='modal-appointment-notice-content' >
//                 {{ modalContent }}
// </view>
//   < !--按钮 -->
//     <navigator url='../../pages/order/order' hover - class="none" wx: if= "{{navigate}}" >
//       <button class= 'modal-appointment-notice-btn' bindtap = 'bindCloseModal' > {{ modalBtnContent }}</button>
//         < /navigator>
//         < button wx: if= "{{!navigate}}" class='modal-appointment-notice-btn' bindtap = 'bindCloseModal' > {{ modalBtnContent }}</button>
//           < /view>
//           < /view>



  // < view class='home-modal' wx: if= '{{showMModal}}' >
  //   <!--预约须知模态框 -->
  //     <view class='modal-appointment-notice  font28' >
  //       <!--标题 -->
  //         <view class='modal-appointment-notice-title' > 11 < /view>
  //           < !--内容 -->
  //             <view class='modal-appointment-notice-content' >
  //               </view>
  //               < !--按钮 -->
  //                 <navigator url='../../pages/order/order' hover - class="none" wx: if= "{{navigate}}" >
  //                   <button class= 'modal-appointment-notice-btn' bindtap = 'bindCloseModal' > {{ modalBtnContent }}</button>
  //                     < /navigator>
  //                     < button wx: if= "{{!navigate}}" class='modal-appointment-notice-btn' bindtap = 'bindCloseModal' > {{ modalBtnContent }}</button>
  //                       < /view>
  //                       < /view>


  // < view class='home-modal' wx: if= '{{showMModal}}' >
  //   <!--预约须知模态框 -->
  //     <view class='modal-appointment-notice  font28' >
  //       <!--标题 -->
  //         <view class='modal-appointment-notice-title' > 11 < /view>
  //           < !--内容 -->
  //             <view class='modal-appointment-notice-content' >
  //               </view>
  //               < !--按钮 -->
  //                 <navigator url='../../pages/order/order' hover - class="none" wx: if= "{{navigate}}" >
  //                   <button class= 'modal-appointment-notice-btn' bindtap = 'bindCloseModal' > {{ modalBtnContent }}</button>
  //                     < /navigator>
  //                     < button wx: if= "{{!navigate}}" class='modal-appointment-notice-btn' bindtap = 'bindCloseModal' > {{ modalBtnContent }}</button>
  //                       < /view>
  //                       < /view>