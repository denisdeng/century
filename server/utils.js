'use strict';

/**
 * 校验请求中的参数是否都存在
 * @param req 请求对象
 * @param params 参数列表
 */
exports.validateRequestParams = (req, ...params) => {
    var object = req.method == 'GET' || req.method == 'DELETE' ? req.query : req.body;
    for(let param of params) {
        if (!object.hasOwnProperty(param)) {
            throw new Error('缺少参数' + param);
        }
    }
};

/**
 *  规范化返回数据的格式
 */
exports.normalize = (content) => {
    var json = content.toJSON();
    json.id = json._id;
    delete json.__v;
    delete json._id;
    return json;
};


exports.promiseOrCallback = (cb, f) => {
    if (cb) {
        f(cb);
    } else {
        return new Promise((resolve, reject) => {
            f((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};