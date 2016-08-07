'use strict';

var express = require('express');
var co = require('co-express');
var api = require('./api');

var router = express.Router();

router.post('/',co(api.login));

router.post('/logout',co(api.logout));

module.exports = router;
