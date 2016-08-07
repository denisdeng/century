'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var mongoose = require('mongoose');
var session = require('express-session');

var logger = require('./logger');
var config = require('./config');
var router = require('./router');

logger.info('------------ Starting Century ------------');
logger.info('Environment = ' + config.env);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

router.set(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('找不到指定的资源');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (config.env == 'dev') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: err.stack || err.message || '未知错误'
        });
    });

    process.on('uncaughtException', function(err) {
        console.error(err);
        process.exit(1);
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(err.status || 500).end();
});


app.listen(config.port);
logger.info('Server is listening on port ' + config.port);
