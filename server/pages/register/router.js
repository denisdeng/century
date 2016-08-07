'use strict';

var express = require('express');
var co = require('co-express');
var api = require('./api');

var router = express.Router();

router.post('/', co(api.register));

module.exports = router;
