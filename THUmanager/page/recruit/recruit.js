var Bmob = require("../../utils/bmob.js");
var skip, recruitSkip;
Page({
  data: {
    buttonTxt1: 'ALL',
    activeIndex: 0,
    menus: [
      {
        'menuId': 0,
        'menu': '寻人',
        "pic": "../../images/zp-act.png"
      },
      {
        'menuId': 1,
        'menu': '帮人',
        "pic": "../../images/qz.png"
      }
    ],
  },
  onLoad: function (options) {
    wx.showShareMenu({})
    // 页面初始化 options为页面跳转所带来的参数
    var vm = this;
    wx.getSystemInfo({
      success: (res) => {
        vm.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    this.recruitList();
    this.candidateList();
    // 页面显示
    var item = wx.getSystemInfoSync().windowWidth / this.data.menus.length + 'px';
    this.setData({
      itemWidth: this.data.menus.length <= 5 ? item : '160rpx'
    });
  },
  tabChange: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      classname: "0",
      search: "0",
      inputShowed: false,
    });
    switch (index) {
      case 0:
        var menus = [
          {
            "menuId": 0,
            "menu": "寻人",
            "pic": "../../images/zp-act.png"
          },
          {
            "menuId": 1,
            "menu": "帮人",
            "pic": "../../images/qz.png"
          }
        ];
        this.setData({
          menus: menus
        })
        break;
      case 1:
        var menus = [
          {
            "menuId": 0,
            "menu": "寻人",
            "pic": "../../images/zp.png"
          },
          {
            "menuId": 1,
            "menu": "帮人",
            "pic": "../../images/qz-act.png"
          }
        ];
        this.setData({
          menus: menus
        })
        break;
    }
    this.setData({
      activeIndex: index
    });
  },
  showToast: function () {
    wx.showToast({
      title: "loading",
      icon: "loading",
    });
  },
  goDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../recruitDetail/recruitDetail?id=" + id
    })
  },
  // update recruitList
  recruitList: function () {
    // 招聘
    var that = this;
    var list = Bmob.Object.extend("recruitList");
    var query = new Bmob.Query(list);
    // 查询所有数据
    query.limit(30);
    query.find({
      success: function (results) {
        console.log(results);
        wx.hideToast();
        // 循环处理查询到的数据
        that.setData({
          recruitList: results,
        });
      },
      error: function (error) {
        wx.hideToast();
        alert("查询失败: " + error.code + " " + error.message);
        wx.showModal({
          title: '提示',
          content: '网络错误，请重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.recruitList();
            }
          }
        })
      }
    });
  },
  // update candidateList
  candidateList: function () {
    // 求职
    var that = this;
    var list = Bmob.Object.extend("candidateList");
    var query = new Bmob.Query(list);
    // 查询所有数据
    query.limit(30);
    query.find({
      success: function (results) {
        console.log(results);
        wx.hideToast();
        // 循环处理查询到的数据
        that.setData({
          candidateList: results,
        });
      },
      error: function (error) {
        wx.hideToast();
        alert("查询失败: " + error.code + " " + error.message);
        wx.showModal({
          title: '提示',
          content: '网络错误，请重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.candidateList();
            }
          }
        })
      }
    });
  },
  hidePick: function () {
    this.setData({
      classname: "0",
      search: "0",
      inputShowed: false,
    });
  },
  search: function (a) {
    var that = this;
    if (this.data.activeIndex == 0) {
      var vData = that.data.recruitList;
    } else {
      var vData = that.data.candidateList;
    }
    console.log(vData);
    var nPos;
    var vResult = [];
    for (var i in vData) {
      var sTxt = vData[i].attributes.title || '';
      nPos = that.find(a, sTxt);
      if (nPos >= 0) {
        vResult[vResult.length] = vData[i].id;
      }
    }
    console.log(vResult.length);
    var a = new Array();
    var o = new Array();
    var array = new Array();
    if (this.data.activeIndex == 0) {
      for (let i = 0; i < vResult.length; i++) {
        var Diary = Bmob.Object.extend("recruitList");
        var query = new Bmob.Query(Diary);
        query.get(vResult[i], {
          success: function (result) {
            o[0] = {
              "id": result.id, "a": result.attributes.salary, "detailId": result.attributes.detailId,
              "b": result.attributes.company, "c": result.attributes.exp, "d": result.attributes.edu,
              "e": result.attributes.place, "time": result.attributes.time, "title": result.attributes.title
            }
            a.push(o[0]);
            that.setData({
              newlist: a
            })
          },
          error: function (object, error) {
            // 查询失败
            console.log(error);
          }
        });
      }
    } else {
      for (let i = 0; i < vResult.length; i++) {
        var Diary = Bmob.Object.extend("candidateList");
        var query = new Bmob.Query(Diary);
        query.get(vResult[i], {
          success: function (result) {
            o[0] = {
              "id": result.id, "a": result.attributes.salary, "detailId": result.attributes.detailId,
              "b": result.attributes.place, "c": result.attributes.edu, "d": result.attributes.age,
              "e": result.attributes.sex, "time": result.attributes.time, "title": result.attributes.title
            }
            a.push(o[0]);
            that.setData({
              newlist: a
            })
          },
          error: function (object, error) {
            // 查询失败
            console.log(error);
          }
        });
      }
    }

    console.log(that.data.newlist);
  },
  find: function (sFind, sObj) {
    var nSize = sFind.length;
    var nLen = sObj.length;
    var sCompare;

    if (nSize <= nLen) {
      for (var i = 0; i <= nLen - nSize + 1; i++) {
        sCompare = sObj.substring(i, i + nSize);
        if (sCompare == sFind) {
          return i;
        }
      }
    }
    return -1;
  },
  showInput: function () {
    console.log("inputTyping");
    this.setData({
      inputShowed: true,
    });
  },
  hideInput: function () {
    console.log("inputTyping");
    this.setData({
      inputVal: "",
      inputShowed: false,
      search: '0'
    });
  },
  clearInput: function () {
    console.log("inputTyping");
    this.setData({
      inputVal: "",
    });
  },
  inputTyping: function (e) {
    this.setData({
      search: '1'
    })
    this.search(e.detail.value);
    this.setData({
      newlist: []
    })
  },
  inputT: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // recruitMore
  recruitMore: function () {
    // 寻项目
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    var that = this;
    var list = Bmob.Object.extend("recruitList");
    var query = new Bmob.Query(list);
    recruitSkip += 30;
    query.limit(30);
    query.skip(recruitSkip);
    query.find({
      success: function (results) {
        console.log(results);
        var recruitMore = that.data.recruitList;
        for (let i = 0; i < results.length; i++) {
          recruitMore.push(results[i])
        }
        // projectMore.push(results);
        console.log(recruitMore);
        // 循环处理查询到的数据
        that.setData({
          recruitList: recruitMore,
        });
        wx.hideToast()
      },
      error: function (error) {
        wx.hideToast();
        alert("查询失败: " + error.code + " " + error.message);
        wx.showModal({
          title: '提示',
          content: '网络错误，请重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              projectSkip -= 30;
              that.recruitMore();
            }
          }
        })
      }
    });
  },
  // candidateMore
  candidateMore: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    var that = this;
    var list = Bmob.Object.extend("candidateList");
    var query = new Bmob.Query(list);
    skip += 30;
    query.limit(30);
    query.skip(skip);
    query.find({
      success: function (results) {
        console.log(results);
        var candidateMore = that.data.candidateList;
        for (let i = 0; i < results.length; i++) {
          candidateMore.push(results[i])
        }
        console.log(candidateMore);
        // 循环处理查询到的数据
        that.setData({
          candidateList: candidateMore,
        });
        wx.hideToast();
      },
      error: function (error) {
        wx.hideToast();
        alert("查询失败: " + error.code + " " + error.message);
        wx.showModal({
          title: '提示',
          content: '网络错误，请重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              skip -= 30;
              that.candidateMore();
            }
          }
        })
      }
    });
  },
})
