'use strict';

var utils = require('../../utils');
var User = require('../../services/models/user');

module.exports = {

    login: function* (req, res) {
        utils.validateRequestParams(req, 'email', 'password');
        var result = yield User.validateUser(req.body.email, req.body.password);
        if (! result.error) {
            var user = result.toJSON();
            delete user.password;
            req.session.user = user;
            res.json({
                user: user
            });
        } else {
            res.json(result);
        }
    },

    logout: function* (req, res) {
        req.session.destroy();
        res.json('ok');
    }

};