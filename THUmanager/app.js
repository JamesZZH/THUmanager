//app.js
var Bmob = require('utils/bmob.js');
Bmob.initialize("580c0bb92f05bb7ebcbaaaa905d0088e", "50dd189bd666d81b9aee7ad39abe188d");
App({
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          Bmob.User.requestOpenId(res.code, {
            success: function (userData) {
              wx.getUserInfo({
                success: function (result) {
                  console.log(result);
                  that.globalData.userInfo = result
                }
              })
            },
            error: function (error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
            }
          });

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        that.globalData.lng = res.longitude;
        that.globalData.lat = res.latitude;
      }
    });
    wx.showShareMenu({})

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {

          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: 'null',
    lat: 'null',
    lng: 'null',
    comment: []
  }
})
