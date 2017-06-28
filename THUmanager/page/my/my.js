var requests = require('../../requests/request.js');
var Bmob = require('../../utils/bmob.js');
var app = getApp();
Page({
  data: {
    phone: '1',
    screenHeight: 0,
    screenWidth: 0
  },
  onLoad: function (options) {
    wx.showShareMenu({})
    var that = this;
    wx.getUserInfo({
      success: function (result) {
        console.log(result);
        that.setData({
          list: app.globalData.userInfo
        });
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res.data)
        that.setData({
          phone: res.data
        });
      }
    });
    wx.getStorage({
      key: 'id',
      success: function (res) {
        console.log(res.data)
        that.getType(res.data);
      }
    });

  },
  getType: function (id) {
    var that = this;
    var userDetail = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(userDetail);
    query.equalTo("userId", id);
    query.find({
      success: function (results) {
        console.log(results);
        wx.setStorage({
          key: "type",
          data: results["0"].attributes.type,
        })
      },
      error: function (error) {
        console.log(error);
      }
    });
  },
  goLogin: function () {
    var that = this;
    var login = this.data.phone;
    if (login == '1') {
      wx.navigateTo({
        url: "../login/login"
      })
    } else {
      wx.navigateTo({
        url: "center"
      })
    }
  },
  // 设置
  goSetting: function () {
    wx.getStorage({
      key: 'id',
      success: function (res) {
        console.log(res);
        wx.navigateTo({
          url: '../setting/setting?id=' + res.data
        })
      }
    })
  },
  // 关于
  goAbout: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../setting/about'
    })
  },
  // 退出登录
  logout: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['退出'],
      itemColor: "#d73925",
      success: function (e) {
        if (e.tapIndex == 0) {
          wx.clearStorage();
          wx.setStorage({
            key: "phone",
            data: '1'
          });
          that.setData({
            phone: '1'
          });
          wx.setStorage({
            key: "psw",
            data: '1'
          });
          wx.switchTab({
            url: '../my/my',
          })
          console.log(e.tapIndex)
        }
      }
    })
  }
});
