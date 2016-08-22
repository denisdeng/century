'use strict';

var fs = require('fs');
var utils = require('../../utils');
var Entry = require('./models/entry');
var Report = require('./models/report');

module.exports = {
    add: function* (req, res) {
        utils.validateRequestParams(req, 'cardNo', 'passport', 'name', 'sex', 'no', 'item', 'shoeSize', 'suitSize');
        var content = {
            name: req.body.name || "",
            level: req.body.level || 0,
            parentId: req.body.parentId || 0,
            parents: req.body.parents
        };
        var entry = yield Entry.add(req.body);
        res.json(utils.normalize(entry));
    },
    query: function* (req, res){
        utils.validateRequestParams(req, 'cardNo');
        var regex = new RegExp(["^", req.body.cardNo, "$"].join(""), "i");
        var condition = {
            cardNo: regex
        };
        var users = yield Entry.getUser(condition);
        var data = {
            data: users.map(utils.normalize),
            errno: users.length > 0 ? 0 : 1
        };
        res.json(data);
    },
    getScore: function* (req, res){
        utils.validateRequestParams(req, 'no');
        var regex = new RegExp(["^", req.body.no, "$"].join(""), "i");
        var condition = {
            no: regex
        };
        var users = yield Report.getScore(condition);
        var data = {
            data: users.map(utils.normalize),
            errno: users.length > 0 ? 0 : 1
        };
        res.json(data);
    }
};
