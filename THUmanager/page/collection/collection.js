
var Bmob = require('../../utils/bmob.js');
var phone, psw, arr = [];
// pages/others/xscroll_top_bar/xscroll_top_bar.js
Page({
  data: {},
  onLoad: function (options) {
    this.getphone();
    arr = [];
    wx.showShareMenu({})
  },
  getphone: function () {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res.data)
        phone = res.data;
        that.getpsw();
      }
    })
  },
  getpsw: function () {
    var that = this;
    wx.getStorage({
      key: 'psw',
      success: function (res) {
        console.log(res.data)
        psw = res.data;
        that.getUser();
      }
    })
  },
  getUser: function () {
    var that = this;
    Bmob.User.logIn(phone, psw, {
      success: function (user) {
        console.log(user.id);
        that.getList(user.id);
      },
      error: function (user, error) {
        wx.showToast({
          title: '对不起，请重新登录',
          icon: 'loading',
          duration: 1000,
          complete: function () {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        })
      }
    });
  },
  goDetail: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  getList: function (a) {
    var that = this;
    var list = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(list);
    query.equalTo("userId", a);
    query.find({
      success: function (results) {
        var collect = results["0"].attributes.collect;
        for (let i = 0; i < collect.length; i++) {
          that.getListDetail(collect[i].tid, collect[i].type);
          console.log(collect[i].tid + "+" + collect[i].type);
        }

      },
      error: function (error) {
        wx.showToast({
          title: '网络错误',
          icon: 'loading',
          duration: 1000,
        })
      }
    });
  },
  getListDetail: function (a, b) {
    var that = this;
    switch (b) {
      case 'ZJ':
        var GameScore = Bmob.Object.extend("capitalList");
        var query = new Bmob.Query(GameScore);
        query.get(a, {
          success: function (res) {
            arr.push(res);
            that.setData({
              capital: arr,
            });
          },
          error: function (object, error) {
            // 查询失败
            console.log('资金查询失败');
            wx.showToast({
              title: '网络错误',
              icon: 'loading',
              duration: 1000,
            })
          }
        });
        break;
      case 'XM':
        var GameScore = Bmob.Object.extend("projectList");
        var query = new Bmob.Query(GameScore);
        query.get(a, {
          success: function (res) {
            arr.push(res);
            that.setData({
              capital: arr,
            });
          },
          error: function (object, error) {
            // 查询失败
            console.log('项目查询失败');
            wx.showToast({
              title: '网络错误',
              icon: 'loading',
              duration: 1000,
            })
          }
        });
        break;
    }
  },
  goDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../detail/detail?id=" + id
    })
  },
})
