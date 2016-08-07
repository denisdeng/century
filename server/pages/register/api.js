'use strict';

var utils = require('../../utils');
var User = require('../../services/models/user');

module.exports = {

    register: function* (req, res) {
        utils.validateRequestParams(req, 'name', 'password', 'email', 'phone');
        // 判断邮箱是否已经注册
        if (! (yield User.checkExist(req.body.email))) {
            yield User.register({
                name: req.body.name,
                password: User.generateHash(req.body.password),
                phone: req.body.phone,
                email: req.body.email
            });
            res.json({
                error: 0
            });
        } else {
            res.json({
                error: '此邮箱已经被注册'
            });
        }
    }

};