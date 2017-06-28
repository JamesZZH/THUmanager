var inputContent = {};
var phoneNum;
var vcodePass;
var phone, psw, vcode, invite, invite_college, name, company, date, college, phone1, edu, mail = '', zw = '', czd = '', jx = '';
var Bmob = require("../../utils/bmob.js");
Page({
  data: {
    step: '1',
    inputContent: {},
    edu: ['本科', '硕士', '博士', '博士后'],
    code_tips:'获取验证码'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.showShareMenu({})
  },
  input: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value;
  },
  phone1: function (e) {
    phoneNum = e.detail.value;
  },
  getVcode: function () {
    var that = this;
    var phone = /0?(13|14|15|18)[0-9]{9}/;
    if (phone.test(phoneNum) == true) {
      Bmob.Sms.requestSmsCode({ "mobilePhoneNumber": phoneNum, "template":"水木资管人"}).then(function (obj) {
        console.log("smsId:" + obj.smsId); //
        that.setData({
          code_tips:'已发送'
        })
      }, function (err) {
        console.log(err);
      });
    }

  },
  formSubmit: function (e) {
    console.log(e);
    var that = this;
    if (this.data.step == '1') {
      // this.setData({ step: '2' });
      phone = e.detail.value.phone;
      psw = e.detail.value.psw;
      vcode = e.detail.value.vcode;
      invite = e.detail.value.invite;
      invite_college = e.detail.value.invite_college;
      this.phone(e.detail.value.phone, e.detail.value.psw, e.detail.value.vcode, e.detail.value.invite, e.detail.value.invite_college);
    } else if (this.data.step == '2') {
      name = e.detail.value.name;
      company = e.detail.value.company;
      date = that.data.date;
      college = e.detail.value.college;
      phone1 = e.detail.value.phone1;
      edu = that.data.eduDetail;
      mail = e.detail.value.mail;
      zw = e.detail.value.zw;
      czd = e.detail.value.czd;
      jx = e.detail.value.jx;
      this.name(e.detail.value.name, e.detail.value.company, that.data.date, e.detail.value.college, that.data.edu[that.data.eduIndex], e.detail.value.mail);
    }
  },
  stepLast: function () {
    if (this.data.step == '1') {
      this.setData({ step: '2' });
    } else {
      this.setData({ step: '1' });
    }
  },
  // 最高学历
  bindEduChange: function (e) {
    var eduDetail = this.data.edu[e.detail.value];
    this.setData({
      eduIndex: e.detail.value,
      eduDetail: eduDetail,
    })
  },
  // 入学年份
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  showToast: function (e) {
    wx.showToast({
      title: e,
      icon: "loading",
      duration: 1000
    });
  },
  // 手机号
  phone: function (a, b, c, d, e) {
    var phone = /0?(13|14|15|18)[0-9]{9}/;
    if (phone.test(a) == true) {
      this.psw(a, b, c, d, e);
    } else {
      this.showToast('请填写手机号');
    }
  },
  // 密码
  psw: function (a, b, c, d, e) {
    if (b.length >= 6) {
      this.vcode(a, b, c, d, e);
    } else {
      this.showToast('请填写密码');
    }
  },
  // 验证码
  vcode: function (a, b, c, d, e) {
    var that = this;
    if (vcodePass != true) {
      Bmob.Sms.verifySmsCode(a, c).then(function (obj) {
        console.log("msg:" + obj.msg);
        that.invite(a, b, c, d, e);
        vcodePass = true;
      }, function (err) {
        console.log("发送失败:" + err);
        that.showToast('验证码错误');
      });
    } else {
      that.invite(a, b, c, d, e);
    }
  },
  // 推荐人
  invite: function (a, b, c, d, e) {
    var that = this;
    if (d != '' && d != undefined) {
      that.invite_college(a, b, c, d, e);
    } else {
      this.showToast('请填写推荐人');
    }
  },
  // 推荐人院系
  invite_college: function (a, b, c, d, e) {
    if (e != '' && e != undefined) {
      this.setData({ step: '2' });
    } else {
      this.showToast('请填写推荐人院系');
    }
  },
  // 真实姓名
  name: function (a, b, c, d, e, f) {
    var real = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
    if (real.test(a) == true) {
      this.company(a, b, c, d, e, f);
    } else {
      this.showToast('请填写真实姓名');
    }
  },
  // 公司
  company: function (a, b, c, d, e, f) {
    if (b != "" && b != undefined) {
      this.years(a, b, c, d, e, f);
    } else {
      this.showToast('请填写公司');
    }
  },
  // 入学年份
  years: function (a, b, c, d, e, f) {
    if (c != '' && c != undefined) {
      this.college(a, b, c, d, e, f);
    } else {
      this.showToast('请填写入学年份');
    }
  },
  // 院系专业
  college: function (a, b, c, d, e, f) {
    if (d != '' && d != undefined) {
      this.edu(a, b, c, d, e, f);
    } else {
      this.showToast('请填写院系专业');
    }
  },
  // 最高学历
  edu: function (a, b, c, d, e, f) {
    if (e != '' && e != undefined) {
      this.mail(a, b, c, d, e, f);
    } else {
      this.showToast('请填写最高学历');
    }
  },
  // 邮箱
  mail: function (a, b, c, d, e, f) {
    this.register();
    // var real = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
    // if (real.test(f) == true) {
    //   this.register();
    // } else {
    //   this.showToast('请填写真实邮箱');
    // }
  },
  register: function () {
    var that = this;
    var user = new Bmob.User();
    user.set("username", phone);
    user.set("password", psw);
    // user.set("email", mail);
    user.signUp(null, {
      success: function (user) {
        that.registerDetail(user.id);
      },
      error: function (user, error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  },
  registerDetail: function (a) {
    var that = this;
    var arr = new Array()
    arr[0] = "";
    var obj = new Array()
    obj[0] = {
      "id": "",
      "tid": "",
      "type": ""
    };
    var userDetail = Bmob.Object.extend("userDetail");
    var userdetail = new userDetail();
    userdetail.set("year", that.data.date);
    userdetail.set("college", college);
    userdetail.set("company", company);
    userdetail.set("edu", edu);
    userdetail.set("invite", invite);
    userdetail.set("phone", phone);
    userdetail.set("phone1", phone1);
    userdetail.set("realName", name);
    userdetail.set("type", '待审核');
    userdetail.set("userId", a);
    userdetail.set("like", arr);
    userdetail.set("dislike", arr);
    userdetail.set("collect", obj);
    userdetail.set("mail", mail);
    userdetail.set("zw", zw);
    userdetail.set("czd", czd);
    userdetail.set("jx", jx);
    userdetail.set("invite_college", invite_college);
    //添加数据，第一个入口参数是null
    userdetail.save(null, {
      success: function (res) {
        that.showToast('注册成功');
        wx.setStorage({
          key: "phone",
          data: phone
        });
        wx.setStorage({
          key: "psw",
          data: psw
        });
        that.goto();
      },
      error: function (res, error) {
        // 添加失败
        console.log('添加数据失败，返回错误信息：' + error.description);
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
});
