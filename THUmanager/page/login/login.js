var Bmob = require('../../utils/bmob.js');
var app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.showShareMenu({})
  },
  login: function (event) {
    var that = this;
    Bmob.User.logIn(event.detail.value.username, event.detail.value.paswd, {
      success: function (user) {
        console.log(user);
        wx.setStorage({
          key: "phone",
          data: event.detail.value.username
        });
        wx.setStorage({
          key: "psw",
          data: event.detail.value.paswd
        });
        wx.setStorage({
          key: "id",
          data: user.id
        });
        that.getUser(user.id);
      },
      error: function (user, error) {
        wx.showToast({
          title: '对不起，您输入的用户名或密码错误',
          icon: 'loading',
          duration: 1000,
        })
      }
    });
  },
  goto: function () {
    setTimeout(function () {
      wx.switchTab({
        url: '../my/my'
      });
    }, 1000);
  },
  showToast: function () {
    var that = this;
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000,
      success: function () {
        that.goto();
      }
    })
  },
  getUser: function (a) {
    var that = this;
    var userDetail = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(userDetail);
    query.equalTo("userId", a);
    query.find({
      success: function (results) {
        console.log(results["0"].id);
        var Diary = Bmob.Object.extend("userDetail");
        var query = new Bmob.Query(Diary);
        query.get(results["0"].id, {
          success: function (result) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            result.set('lat', app.globalData.lat);
            result.set('lng', app.globalData.lng);
            result.save();

            // The object was retrieved successfully.
          },
          error: function (object, error) {

          }
        });
        wx.setStorage({
          key: "userDetailId",
          data: results["0"].id
        })
        wx.setStorage({
          key: "name",
          data: results["0"].attributes.realName
        })
        wx.setStorage({
          key: "type",
          data: results["0"].attributes.type,
          success: function () {
            that.showToast();
          }
        })
      },
      error: function (error) {
        console.log(error);
      }
    });
  },
  register: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  }
});
