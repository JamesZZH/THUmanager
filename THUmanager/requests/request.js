var api = require('./api.js');

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function requestData(url, data, successCallback, errorCallback, completeCallback) {
    wx.request({
        url: url,
        data: data,
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
            if (res.statusCode == 200) {
                successCallback(res.data);
            } else {
                errorCallback();
            }
        },
        error: function () {
            errorCallback();
        },
        complete: function () {
            completeCallback();
        }
    });
}
// 热门列表
function getList(time, page, successCallback, errorCallback, completeCallback) {
    requestData(api.getList(time, page), {}, successCallback, errorCallback, completeCallback);
}
// 文章详情
function getDetail(id, successCallback, errorCallback, completeCallback) {
    requestData(api.getDetail(id), {}, successCallback, errorCallback, completeCallback);
}
// 评论详情
function getComment(id, page, successCallback, errorCallback, completeCallback) {
    requestData(api.getComment(id, page), {}, successCallback, errorCallback, completeCallback);
}
// 转发详情
function getRepost(id, page, successCallback, errorCallback, completeCallback) {
    requestData(api.getRepost(id, page), {}, successCallback, errorCallback, completeCallback);
}
// 点赞详情
function getAttitudes(id, page, successCallback, errorCallback, completeCallback) {
    requestData(api.getAttitudes(id, page), {}, successCallback, errorCallback, completeCallback);
}
// 广告页图片
function getPicInfo(successCallback, errorCallback, completeCallback) {
    requestData(api.getAdPic(), {}, successCallback, errorCallback, completeCallback);
}

module.exports = {
    getList: getList,
    getDetail: getDetail,
    getComment: getComment,
    getRepost: getRepost,
    getAttitudes: getAttitudes,
    getPicInfo: getPicInfo
};