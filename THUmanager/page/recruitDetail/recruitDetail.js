var Bmob = require('../../utils/bmob.js');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data: {
    contactVisible: 3,
    title:''
  },
  onLoad: function (options) {
    wx.showShareMenu({})
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    app.globalData.id = id;
    console.log(app.globalData.id);
    var that = this;
        that.setData({ contactVisible: '3' });
    var detail = Bmob.Object.extend("recruitDetail");
    var query = new Bmob.Query(detail);
    wx.getStorage({
      key: 'id',
      success: function (res) {
        that.getType(res.data);
      },
    })
    query.get(id, {
      success: function (result) {
        that.setData({ list: result });
        that.setData({ title: result._serverData.title });
        app.globalData.comment = result._serverData.comment;
        console.log(app.globalData.comment);
        var article = result._serverData.detail;
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
  },
  getType: function (a) {
    var that = this;
    var userDetail = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(userDetail);
    query.equalTo("userId", a);
    query.find({
      success: function (results) {
        var contactVisible = results["0"].attributes.type;
        wx.setStorage({
          key: "type",
          data: contactVisible,
          success: function (res) {
            if (contactVisible == '封停' || contactVisible == '未通过审核') {
              that.setData({ contactVisible: '0' });
            } else if (contactVisible == '待审核') {
              that.setData({ contactVisible: '1' });
            } else if (contactVisible == '已审核') {
              that.setData({ contactVisible: '2' });
            }
          }
        })
      },
      error: function (error) {
        console.log(error);
      }
    });
  },
  goLogin: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  goComment: function () {
  var that = this;
    wx.navigateTo({
      url: '../recruitDetail/comment?title='+that.data.title
    })
  }
})