'use strict';

var express = require('express');
var co = require('co-express');
var api = require('./api');

var router = express.Router();

// -------- Routes Start ---------

/**
 * 添加用户
 */
router.get('/add', co(api.add));

//查询用户
router.post('/query', co(api.query));

// -------- Routes End ---------

module.exports = router;


