'use strict';

var fs = require('fs'),
    winston = require('winston');

var logFolderPath = __dirname + '/../logs/';
try {
    fs.mkdirSync(logFolderPath);
} catch (e) {
    // ignore
}

var logger = new winston.Logger({

    transports: [
        new winston.transports.Console({
            level: 'debug',
            colorize: true,
            timestamp: true,
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: logFolderPath + 'century.log',
            level: 'info',
            timestamp: true,
            json: false,
            maxsize: 1024 * 1024
        })
    ],

    exceptionHandlers: [
        new winston.transports.File({
            filename: logFolderPath + 'exceptions.log',
            timestamp: true,
            json: false,
            maxsize: 1024 * 1024
        })
    ]

});


module.exports = logger;
