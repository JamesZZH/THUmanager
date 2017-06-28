var Bmob = require("../../utils/bmob.js");
var pick1 = "不限", pick2 = "不限", pick3 = "不限";
var skip, projectSkip;
Page({
  data: {
    newlist: [],
    search: '0',
    dis: '1',
    inputShowed: false,
    inputVal: "",
    showList: 0,
    show: 3,
    buttonTxt: "",
    act3: 0,
    menus: [
      {
        "menuId": 0,
        "menu": "项目",
        "pic": "../../images/tz-act.png"
      },
      {
        "menuId": 1,
        "menu": "资金",
        "pic": "../../images/qian.png"
      }
    ],
    activeIndex: 0,
    pick1: [],
    pick2: [{
      "num": 0,
      "name": "不限"
    },],
    pick3: [{
      "num": 0,
      "name": "不限"
    },],
    pickXZJ: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "债权项目"
      },
      {
        "num": 2,
        "name": "股权项目"
      },
      {
        "num": 3,
        "name": "不动产项目"
      },
      {
        "num": 4,
        "name": "其他项目"
      }
    ],
    pickZQXM: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "4%以下"
      },
      {
        "num": 2,
        "name": "4%-6%"
      },
      {
        "num": 3,
        "name": "6%-8%"
      },
      {
        "num": 4,
        "name": "8%以上"
      }
    ],
    pickZQXM2: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "1年内"
      },
      {
        "num": 2,
        "name": "1-3年"
      },
      {
        "num": 3,
        "name": "3-5年"
      },
      {
        "num": 4,
        "name": "5年以上"
      }
    ],
    pickGQXM: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "一级市场"
      },
      {
        "num": 2,
        "name": "二级市场"
      }
    ],
    pickYJSC: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "天使"
      },
      {
        "num": 2,
        "name": "VC/PE"
      },
      {
        "num": 3,
        "name": "并购收购"
      },
      {
        "num": 4,
        "name": "IPO(上市)"
      }
    ],
    pickEJSC: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "定增"
      },
      {
        "num": 2,
        "name": "量化"
      },
      {
        "num": 3,
        "name": "配资"
      },
      {
        "num": 4,
        "name": "期货"
      },
      {
        "num": 5,
        "name": "证券基金"
      }
    ],
    pickBDCXM: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "住宅"
      },
      {
        "num": 2,
        "name": "商业办公"
      },
      {
        "num": 3,
        "name": "工业物流"
      },
      {
        "num": 4,
        "name": "棚区改造"
      },
      {
        "num": 5,
        "name": "农业"
      }
    ],
    pickBDCXM2: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "拿地状态"
      },
      {
        "num": 2,
        "name": "已建成物业"
      }
    ],
    pickQTXM: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "结构化基金"
      },
      {
        "num": 2,
        "name": "艺术品"
      },
      {
        "num": 3,
        "name": "大宗商品"
      },
      {
        "num": 4,
        "name": "PPP"
      }
    ],
    pickJGHJJ: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "GP"
      },
      {
        "num": 2,
        "name": "LP"
      }
    ],
    pickYSP: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "古玩"
      },
      {
        "num": 2,
        "name": "邮票"
      },
      {
        "num": 3,
        "name": "字画"
      }
    ],
    pickDZSP: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "石油"
      },
      {
        "num": 2,
        "name": "贵金属"
      }
    ],
    pickPPP: [
      {
        "num": 0,
        "name": "不限"
      }
    ],
    XMpick1: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "4%及以下"
      },
      {
        "num": 2,
        "name": "4%-6%"
      },
      {
        "num": 3,
        "name": "6%-8%"
      },
      {
        "num": 4,
        "name": "8%-10%"
      },
      {
        "num": 5,
        "name": "10%-18%"
      },
      {
        "num": 6,
        "name": "20%及以上"
      }
    ],
    XMpick2: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "3个月及以下"
      },
      {
        "num": 2,
        "name": "3-6个月"
      },
      {
        "num": 3,
        "name": "1年"
      },
      {
        "num": 4,
        "name": "1-3年"
      },
      {
        "num": 5,
        "name": "3-5年"
      },
      {
        "num": 6,
        "name": "5年以上"
      }
    ],
    XMpick3: [
      {
        "num": 0,
        "name": "不限"
      },
      {
        "num": 1,
        "name": "银行"
      },
      {
        "num": 2,
        "name": "信托"
      },
      {
        "num": 3,
        "name": "券商"
      },
      {
        "num": 4,
        "name": "资管"
      },
      {
        "num": 5,
        "name": "保险"
      },
      {
        "num": 6,
        "name": "私募股权"
      },
      {
        "num": 7,
        "name": "私募证券"
      },
      {
        "num": 8,
        "name": "基金"
      },
      {
        "num": 9,
        "name": "上市公司"
      },
      {
        "num": 10,
        "name": "政府财政"
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var vm = this;
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        vm.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
    wx.showShareMenu({})
  },
  onShow: function () {
    this.capitalList();
    this.project();
    // 页面显示
    var item = wx.getSystemInfoSync().windowWidth / this.data.menus.length + "px";
    this.setData({
      itemWidth: this.data.menus.length <= 5 ? item : "160rpx"
    });
  },
  tabChange: function (e) {
    this.capitalList();
    this.project();
    this.setData({
      classname: "0",
      search: "0",
      inputShowed: false,
    });
    var index = e.currentTarget.dataset.index;
    switch (index) {
      case 0:
        var menus = [
          {
            "menuId": 0,
            "menu": "项目",
            "pic": "../../images/tz-act.png"
          },
          {
            "menuId": 1,
            "menu": "资金",
            "pic": "../../images/qian.png"
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
            "menu": "项目",
            "pic": "../../images/tz.png"
          },
          {
            "menuId": 1,
            "menu": "资金",
            "pic": "../../images/qian-act.png"
          }
        ];
        this.setData({
          menus: menus
        })
        break;
    }
    this.setData({ activeIndex: index });
  },
  buttonChange: function () {
    var _this = this;
    this.setData({ activepick1: ".", activepick2: ".", activepick3: ".", inputShowed: false, search: '0' });
    if (_this.data.activeIndex == 0) {
      this.setData({ pick1: _this.data.pickXZJ, pick2: [], pick3: [] });
    } else if (_this.data.activeIndex == 1) {
      this.setData({ pick1: _this.data.XMpick1, pick2: [], pick3: [] });
    }
    if (this.data.classname == "1") {
      this.setData({ classname: "0" });
    } else {
      this.setData({ classname: "1" });
    }
  },
  hidePick: function () {
    this.setData({
      classname: "0",
      search: "0",
      inputShowed: false,
    });
  },
  pick1: function (e) {
    pick1 = e.currentTarget.dataset.name;
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var activeIndex = this.data.activeIndex;
    if (activeIndex == 0) {
      this.setData({ act3: "0" });
      switch (index) {
        case 0:
          this.setData({ classname: "0" });
          this.capitalList();
          this.showToast();
          break;
        case 1:
          // 债权 
          this.setData({ activepick1: e.currentTarget.dataset.index });
          this.setData({ pick2: _this.data.pickZQXM });
          break;
        case 2:
          // 股权
          this.setData({ activepick1: e.currentTarget.dataset.index });
          this.setData({ pick2: _this.data.pickGQXM });
          break;
        case 3:
          // 不动产
          this.setData({ activepick1: e.currentTarget.dataset.index });
          this.setData({ pick2: _this.data.pickBDCXM });
          break;
        case 4:
          // 其他
          this.setData({ activepick1: e.currentTarget.dataset.index });
          this.setData({ pick2: _this.data.pickQTXM });
          break;
      }
    } else if (activeIndex == 1) {
      if (index == 0) {
        this.showToast();
        this.project();
        this.setData({ classname: "0" });
      } else {
        this.setData({ activepick1: e.currentTarget.dataset.index, pick2: _this.data.XMpick2 });
      }
    }
  },
  pick2: function (e) {
    pick2 = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var _this = this;
    var activeIndex = this.data.activeIndex;
    if (activeIndex == 0) {
      switch (_this.data.activepick1) {
        case 1:
          // 债权
          if (index == 0) {
            this.filter();
            this.setData({ classname: "0" });
          } else {
            this.setData({ activepick2: index, pick3: _this.data.pickZQXM2, act3: "1" });
          }
          break;
        case 2:
          // 股权
          if (index == 0) {
            this.filter();
            this.setData({ classname: "0" });
          } else if (index == 1) {
            // 一级市场
            this.setData({ activepick2: index, pick3: _this.data.pickYJSC, act3: "1" });
          } else {
            // 二级市场
            this.setData({ activepick2: index, pick3: _this.data.pickEJSC, act3: "1" });
          }
          break;
        case 3:
          if (index == 0) {
            this.filter();
            this.setData({ classname: "0" });
          } else {
            this.setData({ activepick2: index, pick3: _this.data.pickBDCXM2, act3: "1" });
          }
          break;
        case 4:
          // 其他
          if (index == 0) {
            this.filter();
            this.setData({ classname: "0" });
          } else if (index == 1) {
            // 结构化基金
            this.setData({ activepick2: index, pick3: _this.data.pickJGHJJ, act3: "1" });
          } else if (index == 2) {
            // 艺术品
            this.setData({ activepick2: index, pick3: _this.data.pickYSP, act3: "1" });
          } else if (index == 3) {
            // 大宗商品
            this.setData({ activepick2: index, pick3: _this.data.pickDZSP, act3: "1" });
          } else if (index == 4) {
            // PPP
            this.setData({ activepick2: index, pick3: _this.data.pickPPP, act3: "1" });
          }
          // this.setData({ activepick3: index, pick2: _this.data.pickQTXM, classname: "0"  });
          break;
      }
    } else if (activeIndex == 1) {
      if (index == 0) {
        this.showToast();
        this.filter();
        this.setData({ classname: "0" });
      } else {
        this.setData({ activepick2: index, pick3: _this.data.XMpick3, act3: "1" });
      }
    }
  },
  pick3: function (e) {
    pick3 = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    this.setData({ activepick3: e.currentTarget.dataset.index, classname: "0" });
    this.filter();
    this.showToast();
  },
  showToast: function () {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    });
  },
  goDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var tid = e.currentTarget.dataset.tid;
    console.log(id + '&' + tid);
    wx.navigateTo({
      url: "../detail/detail?id=" + id + '&tid=' + tid
    })
  },
  // update capitalList
  capitalList: function () {
    this.setData({
      buttonTxt: "筛选",
      dis: '1'
    });
    // 寻项目
    var that = this;
    var list = Bmob.Object.extend("capitalList");
    var query = new Bmob.Query(list);
    // 查询所有数据
    query.limit(30);
    query.find({
      success: function (results) {
        wx.hideToast();
        console.log(results)
        // 循环处理查询到的数据
        that.setData({
          capital: results,
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
              that.capitalList();
            }
          }
        })
      }
    });
  },
  // update projectList
  project: function () {
    this.setData({
      buttonTxt: "筛选",
      dis: '1'
    });
    // 寻资金
    var that = this;
    var list = Bmob.Object.extend("projectList");
    var query = new Bmob.Query(list);
    // 查询所有数据
    query.limit(30);
    query.find({
      success: function (results) {
        wx.hideToast();
        // 循环处理查询到的数据
        that.setData({
          project: results,
        });
      },
      error: function (error) {
        wx.hideToast();
        alert("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  filter: function () {
    var activeIndex = this.data.activeIndex;
    if (activeIndex == 0) {
      // 寻资金
      var that = this;
      var list = Bmob.Object.extend("capitalList");
      var query = new Bmob.Query(list);
      query.limit(1000);
      // 根据条件
      if (pick3 != "不限") {
        this.setData({ buttonTxt: pick1 + "-" + pick2 + "-" + pick3, dis: '0' });
        query.equalTo("pick3", pick3);
        query.equalTo("pick2", pick2);
        query.equalTo("pick1", pick1);
      } else if (pick2 != "不限") {
        this.setData({ buttonTxt: pick1 + "-" + pick2 + "-" + "不限", dis: '0' });
        console.log(pick1 + "+" + pick2);
        query.equalTo("pick2", pick2);
        query.equalTo("pick1", pick1);
      } else if (pick1 != "不限") {
        this.setData({ buttonTxt: pick1 + "-" + "不限" + "-" + "不限", dis: '0' });
        query.equalTo("pick1", pick1);
      }
      query.find({
        success: function (results) {
          wx.hideToast();
          // 循环处理查询到的数据
          that.setData({
            capital: results,
          });
        },
        error: function (error) {
          alert("查询失败: " + error.code + " " + error.message);
        }
      });
    } else {
      // 寻项目
      var that = this;
      var list = Bmob.Object.extend("projectList");
      var query = new Bmob.Query(list);
      // 查询所有数据
      query.limit(1000);
      // 根据条件
      if (pick3 != "不限") {
        this.setData({
          buttonTxt: pick1 + "-" + pick2 + "-" + pick3,
          dis: '0'
        });
        query.equalTo("pick3", pick3);
        query.equalTo("pick2", pick2);
        query.equalTo("pick1", pick1);
      } else if (pick2 != "不限") {
        this.setData({ buttonTxt: pick1 + "-" + pick2 + "-" + "不限", dis: '0' });
        query.equalTo("pick2", pick2);
        query.equalTo("pick1", pick1);
      } else if (pick1 != "不限") {
        this.setData({ buttonTxt: pick1 + "-" + "不限" + "-" + "不限", dis: '0' });
        query.equalTo("pick1", pick1);
      }
      query.find({
        success: function (results) {
          wx.hideToast();
          // 循环处理查询到的数据
          that.setData({
            project: results,
          });
        },
        error: function (error) {
          alert("查询失败: " + error.code + " " + error.message);
        }
      });
    }
  },
  search: function (a) {
    var that = this;
    if (this.data.activeIndex == 0) {
      var vData = that.data.capital;
    } else {
      var vData = that.data.project;
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
    };
    for (let i in vData) {
      var repeat = 'false';
      for (let x in vData[i].attributes.label) {
        var sTxt = vData[i].attributes.label[x] || '';
        nPos = that.find(a, sTxt);
        if (nPos >= 0) {
          for (let z in vResult) {
            if (vData[i].id == vResult[z]) {
              repeat = 'true';
            }
          }
          if (repeat == 'false') {
            vResult[vResult.length] = vData[i].id;
          }
        }
      }
    };
    console.log(vResult);
    var a = new Array();
    var o = new Array();
    var array = new Array();
    if (this.data.activeIndex == 0) {
      for (let i = 0; i < vResult.length; i++) {
        var Diary = Bmob.Object.extend("capitalList");
        var query = new Bmob.Query(Diary);
        query.get(vResult[i], {
          success: function (result) {
            o[0] = {
              "id": result.id, "amount": result.attributes.amount, "detailId": result.attributes.detailId,
              "label": result.attributes.label, "place": result.attributes.place,
              "time": result.attributes.time, "title": result.attributes.title
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
        var Diary = Bmob.Object.extend("projectList");
        var query = new Bmob.Query(Diary);
        query.get(vResult[i], {
          success: function (result) {
            o[0] = {
              "id": result.id, "amount": result.attributes.amount, "detailId": result.attributes.detailId,
              "label": result.attributes.label, "place": result.attributes.place,
              "time": result.attributes.time, "title": result.attributes.title
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
      classname: "0"
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
  // projectMore
  projectMore: function () {
    // 寻项目
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    var that = this;
    var list = Bmob.Object.extend("projectList");
    var query = new Bmob.Query(list);
    projectSkip += 30;
    query.limit(30);
    query.skip(projectSkip);
    query.find({
      success: function (results) {
        console.log(results);
        var projectMore = that.data.project;
        for (let i = 0; i < results.length; i++) {
          projectMore.push(results[i])
        }
        // projectMore.push(results);
        console.log(projectMore);
        // 循环处理查询到的数据
        that.setData({
          project: projectMore,
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
              that.capitalMore();
            }
          }
        })
      }
    });
  },
  // capitalMore
  capitalMore: function () {
    // 寻资金
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    var that = this;
    var list = Bmob.Object.extend("capitalList");
    var query = new Bmob.Query(list);
    skip += 30;
    query.limit(30);
    query.skip(skip);
    query.find({
      success: function (results) {
        console.log(results);
        var capitalMore = that.data.capital;
        for (let i = 0; i < results.length; i++) {
          capitalMore.push(results[i])
        }
        // capitalMore.push(results)
        console.log(capitalMore);
        // 循环处理查询到的数据
        that.setData({
          capital: capitalMore,
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
              that.capitalMore();
            }
          }
        })
      }
    });
  },
})


