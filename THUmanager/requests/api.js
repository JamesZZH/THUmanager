const adPic = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
const headerUrl = 'http://m.weibo.cn/container/getIndex?containerid=102803_ctg1_';
const footerUrl = '&count=10&luicode=10000011&lfid=102803_ctg1_8999_-_ctg1_8999_home&page=';
const hours = headerUrl + '9999_-_ctg1_9999&pageid=102803_ctg1_9999_-_ctg1_9999' + footerUrl;
const yesterday = headerUrl + '8899_-_ctg1_8899&pageid=102803_ctg1_8899_-_ctg1_8899' + footerUrl;
const twodays = headerUrl + '8799_-_ctg1_8799&pageid=102803_ctg1_8799_-_ctg1_8799' + footerUrl;
const detail = 'http://m.weibo.cn/statuses/extend?id=';
const comment = 'http://m.weibo.cn/api/comments/show?id=';
const repost = 'http://m.weibo.cn/api/statuses/repostTimeline?id=';
const attitudes = 'https://m.weibo.cn/api/attitudes/show?id=';
/**
 * 获取最新列表
 * @returns {string}
 */
function getList(time, page) {
    if (time == "yesterday") {
        return yesterday + page;
    } else if (time == "twodays") {
        return twodays + page;
    }
}
/**
 * 获取详情
 * @param {string} id 文章id
 * @return {string}
 */
function getDetail(id) {
    return detail + id;
}
/**
 * 获取评论详情
 * @param {string} id 文章id;page 评论页
 * @return {string}
 */
function getComment(id, page) {
    return comment + id + '&page=' + page;
}
/**
 * 获取转发详情
 * @param {string} id 文章id;page 转发页
 * @return {string}
 */
function getRepost(id, page) {
    return repost + id + '&page=' + page;
}
/**
 * 获取点赞详情
 * @param {string} id 文章id;page 转发页
 * @return {string}
 */
function getAttitudes(id, page) {
    return attitudes + id + '&page=' + page;
}
/**
 * 获取启动界面封面
 * @param {string} w,h 图片尺寸 width,height
 * @return {string}
 */
function getAdPic(w, h) {
    return adPic + w + '&h=' + h;
}

module.exports = {
    getList: getList,
    getDetail: getDetail,
    getComment: getComment,
    getRepost: getRepost,
    getAttitudes: getAttitudes,
    getAdPic: getAdPic,
};
