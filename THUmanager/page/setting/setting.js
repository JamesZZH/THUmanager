var Bmob = require('../../utils/bmob.js');
var app = getApp();
var id;
Page({
  data: {
    edu: ['本科', '硕士', '博士', '博士后'],
    dis: false
  },
  onLoad: function (options) {
    wx.showShareMenu({})
    console.log(options);
    var that = this;
    var userDetail = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(userDetail);
    query.equalTo("userId", options.id);
    query.find({
      success: function (results) {
        console.log(results);
        id = results[0].id;
        that.setData({
          list: results[0],
          eduDetail: results[0].attributes.edu,
          year: results[0].attributes.year
        })
      },
      error: function (error) {
        console.log(error);
      }
    });
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
  // 入学年份
  bindDateChange: function (e) {
    this.setData({
      year: e.detail.value
    })
  },
  // 最高学历
  bindEduChange: function (e) {
    var eduDetail = this.data.edu[e.detail.value];
    this.setData({
      eduIndex: e.detail.value,
      eduDetail: eduDetail,
    })
  },
  formSubmit: function (e) {
    this.setData({
      dis: true
    })
    var that = this;
    console.log(e);
    console.log(this.data.year);
    console.log(this.data.eduDetail);
    var Diary = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(Diary);
    query.get(id, {
      success: function (userdetail) {
        console.log(userdetail);
        userdetail.set("year", that.data.year);
        userdetail.set("college", e.detail.value.college);
        userdetail.set("company", e.detail.value.company);
        userdetail.set("edu", that.data.eduDetail);
        userdetail.set("realName", e.detail.value.name);
        userdetail.set("phone1", e.detail.value.phone1);
        userdetail.set("mail", e.detail.value.mail);
        userdetail.set("zw", e.detail.value.zw);
        userdetail.set("czd", e.detail.value.czd);
        userdetail.set("jx", e.detail.value.jx);
        userdetail.save();
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 5000,
          complete: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
        // The object was retrieved successfully.
      },
      error: function (object, error) {

      }
    });
  }
})