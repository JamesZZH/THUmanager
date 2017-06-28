var forbidden = require('forbidden.js')
var Bmob = require('../../utils/bmob.js');
var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({ title: options.title });
    wx.showShareMenu({})
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindFormSubmit: function (e) {
    var that = this;
    var content = forbidden.replaceForbiddenWords(e.detail.value.textarea);
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var time = year + '-' + month + '-' + day;
    var id;
    wx.getStorage({
      key: 'id',
      success: function (res) {
        id = res.data;
      },
    })
    wx.getStorage({
      key: 'name',
      success: function (res) {
        that.submit(res.data, time, content, id);
      },
    })
  },
  submit: function (a, b, c, d) {
    var o = { "id": d, "name": a, "time": b, "content": c };
    var x;
    var array = new Array();
    if (app.globalData.comment == undefined) {
      array[0] = o
      x = array;
      console.log(x);
    } else {
      app.globalData.comment.unshift(o)
      x = app.globalData.comment;
      console.log(x);
    }
    var detail = Bmob.Object.extend("recruitDetail");
    var query = new Bmob.Query(detail);
    // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    query.get(app.globalData.id, {
      success: function (result) {
        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        result.set('comment', x);
        result.save();
        wx.showToast({
          title: '已留言',
          icon: 'success',
          duration: 1000,
        });
        // The object was retrieved successfully.
      },
      error: function (object, error) {
        console.log(error);
      }
    });
  }
})