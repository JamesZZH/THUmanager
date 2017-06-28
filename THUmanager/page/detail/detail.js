var Bmob = require('../../utils/bmob.js');
var WxParse = require('../../wxParse/wxParse.js');
var id, userDetailId, tid;
// pages/others/xscroll_top_bar/xscroll_top_bar.js
var app = getApp();
Page({
  data: {
    contactVisible: 3,
    isCollection: 0,
    isLike: 0,
    isDislike: 0,
    likeNum: 0,
    disLikeNum: 0,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.showShareMenu({})
    console.log(options)
    id = options.id;
    tid = options.tid;
    app.globalData.id = id;
  },
  onShow: function () {
    var that = this;
    that.setData({ contactVisible: '3' });
    var detail = Bmob.Object.extend("detail");
    var query = new Bmob.Query(detail);
    wx.getStorage({
      key: 'id',
      success: function (res) {
        that.getType(res.data);
      },
    });
    wx.getStorage({
      key: 'userDetailId',
      success: function (res) {
        console.log(res);
        userDetailId = res.data;
      },
      fail: function (res) {
        console.log(res);
        userDetailId = '0';
      }
    })
    query.get(id, {
      success: function (result) {
        console.log(result);
        that.setData({ list: result });
        that.setData({ likeNum: Number(result.attributes.like) });
        that.setData({ disLikeNum: Number(result.attributes.dislike) });
        that.setData({ title: result._serverData.title });
        that.setData({ detailId: result.id });
        that.setData({ typeDetail: result.attributes.type });
        app.globalData.comment = result._serverData.comment;
        console.log(app.globalData.comment);
        var article = result._serverData.detail;
        // var article = '<p>111</p>';
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
    wx.getStorage({
      key: 'id',
      success: function (res) {
        that.getList(res.data);
      }
    })
  },
  getType: function (a) {
    var that = this;
    var userDetail = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(userDetail);
    query.equalTo("userId", a);
    query.find({
      success: function (results) {
        console.log(results);
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
      url: '../detail/comment?title=' + that.data.title
    })
  },
  // 点赞按钮
  like: function (e) {
    if (userDetailId == '0') {
      this.goLogin();
    } else {
      var num = e.currentTarget.dataset.num;
      console.log(e);
      var that = this;
      var likeDetail = this.data.likeDetail;
      var GameScore = Bmob.Object.extend("userDetail");
      var query = new Bmob.Query(GameScore);
      if (this.data.isLike == 0) {
        likeDetail.push(that.data.detailId);
        query.get(userDetailId, {
          success: function (gameScore) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            gameScore.set('like', likeDetail);
            gameScore.save();
            that.setData({ isLike: '1' });
            that.change("like");
          },
          error: function (object, error) {
          }
        });
      } else if (this.data.isLike == 1) {
        for (let i = 0; i < likeDetail.length; i++) {
          if (likeDetail[i] == that.data.detailId) {
            likeDetail.splice(i, 1);
          }
        }
        query.get(userDetailId, {
          success: function (gameScore) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            gameScore.set('like', likeDetail);
            gameScore.save();
            that.setData({ isLike: '0' });
            that.change("like");
          },
          error: function (object, error) {
            console.log(error)
          }
        });
      }
    }

  },
  // 有风险按钮
  dislike: function () {
    if (userDetailId == '0') {
      this.goLogin();
    } else {
      var that = this;
      var disLikeDetail = this.data.disLikeDetail;
      var GameScore = Bmob.Object.extend("userDetail");
      var query = new Bmob.Query(GameScore);
      if (this.data.isDislike == 0) {
        disLikeDetail.push(that.data.detailId);
        query.get(userDetailId, {
          success: function (gameScore) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            gameScore.set('dislike', disLikeDetail);
            gameScore.save();
            that.setData({ isDislike: '1' });
            that.change("dislike");
          },
          error: function (object, error) {
            console.log(error)
          }
        });
      } else if (this.data.isDislike == 1) {
        for (let i = 0; i < disLikeDetail.length; i++) {
          if (disLikeDetail[i] == that.data.detailId) {
            disLikeDetail.splice(i, 1);
          }
        }
        query.get(userDetailId, {
          success: function (gameScore) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            gameScore.set('dislike', disLikeDetail);
            gameScore.save();
            that.setData({ isDislike: '0' });
            that.change("dislike");
          },
          error: function (object, error) {
            console.log(error)
          }
        });
      }
    }

  },
  // 收藏按钮
  collection: function () {
    var is_collect = 'false';
    if (userDetailId == '0') {
      this.goLogin();
    } else {
      var that = this;
      var collectDetail = this.data.collectDetail;

      var GameScore = Bmob.Object.extend("userDetail");
      var obj = new Array()
      obj[0] = {
        "id": id,
        "tid": tid,
        "type": that.data.typeDetail
      };
      var query = new Bmob.Query(GameScore);
      if (this.data.isCollection == 0) {
        query.get(userDetailId, {
          success: function (gameScore) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            gameScore.set('collect', collectDetail.concat(obj));
            gameScore.save();
            that.setData({ isCollection: '1' });
          },
          error: function (object, error) {
          }
        });
      }
      else if (this.data.isCollection == 1) {
        for (let i = 0; i < collectDetail.length; i++) {
          if (collectDetail[i].id == that.data.detailId) {
            collectDetail.splice(i, 1);
            console.log(collectDetail);
          }
        }
        query.get(userDetailId, {
          success: function (gameScore) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            gameScore.set('collect', collectDetail);
            gameScore.save();
            that.setData({ isCollection: '0' });
          },
          error: function (object, error) {
          }
        });
      }
    }

  },
  // change
  change: function (a) {
    var that = this;
    var GameScore = Bmob.Object.extend("detail");
    var query = new Bmob.Query(GameScore);
    switch (a) {
      case "like":
        if (that.data.isLike == '1') {
          query.get(id, {
            success: function (gameScore) {
              var likes = (that.data.likeNum + 1).toString();
              gameScore.set("like", likes);
              that.setData({ likeNum: Number(that.data.likeNum) + 1 });
              gameScore.save();
            },
            error: function (object, error) {
              console.log(error)
            }
          });
        } else if (that.data.isLike == '0') {
          query.get(id, {
            success: function (gameScore) {
              var likes = (that.data.likeNum - 1).toString();
              gameScore.set("like", likes);
              that.setData({ likeNum: Number(that.data.likeNum) - 1 });
              gameScore.save();
            },
            error: function (object, error) {
              console.log(error)
            }
          });
        }
        break;
      case "dislike":
        if (that.data.isDislike == '1') {
          query.get(id, {
            success: function (gameScore) {
              var dislikes = (that.data.disLikeNum + 1).toString();
              gameScore.set("dislike", dislikes);
              that.setData({ disLikeNum: that.data.disLikeNum + 1 });
              gameScore.save();
            },
            error: function (object, error) {
              console.log(error)
            }
          });
        } else if (that.data.isDislike == '0') {
          query.get(id, {
            success: function (gameScore) {
              var dislikes = (that.data.disLikeNum - 1).toString();
              gameScore.set("dislike", dislikes);
              that.setData({ disLikeNum: that.data.disLikeNum - 1 });
              gameScore.save();
            },
            error: function (object, error) {
              console.log(error)
            }
          });
        }
    }
  },
  getList: function (a) {
    var that = this;
    var list = Bmob.Object.extend("userDetail");
    var query = new Bmob.Query(list);
    query.equalTo("userId", a);
    query.find({
      success: function (results) {
        console.log(results)
        var detailId = that.data.detailId;
        that.setData({ likeDetail: results["0"].attributes.like });
        that.setData({ disLikeDetail: results["0"].attributes.dislike });
        that.setData({ collectDetail: results["0"].attributes.collect });
        for (let i = 0; i < results["0"].attributes.collect.length; i++) {
          if (results["0"].attributes.collect[i].id == detailId) {
            that.setData({ isCollection: '1' });
          };
        };
        for (let i = 0; i < results["0"].attributes.like.length; i++) {
          if (results["0"].attributes.like[i] == detailId) {
            that.setData({ isLike: '1' });
          };
        };
        for (let i = 0; i < results["0"].attributes.dislike.length; i++) {
          if (results["0"].attributes.dislike[i] == detailId) {
            that.setData({ isDislike: '1' });
          };
        };

      },
      error: function (error) {
        alert("查询失败: " + error.code + " " + error.message);
      }
    });
  }
})