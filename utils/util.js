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
  const day = date.getDate()
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
  console.log('http');
  var reqbody = reqbody ? reqbody : {};
  var dataStr = JSON.stringify({
      reqbody: reqbody
  });
  wx.request({
    url: url,
    data: dataStr,
    method: 'POST',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  mformatTime: mformatTime,
  http:http
}
