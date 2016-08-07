'use strict';

var mongoose = require('mongoose');
var logger = require('./logger');
var Grid = require('gridfs-stream');
var config = require('./config');

Grid.mongo = mongoose.mongo;

var gridfs;

function init() {
    mongoose.connect(config.mongodbURL);

    var db = mongoose.connection;

    db.on('error', (message) => {
        logger.error(`Failed to connect MongoDB at "${config.mongodbURL}".`);
        logger.error(message);
    });

    db.once('open', () => {
        gridfs = Grid(mongoose.connection.db);
        logger.info(`Connected to MongoDB "${config.mongodbURL}" successfully.`);
    });
}

init();


exports.getGridFSInstance = function() {
    return gridfs;
};

exports.mongo = Grid.mongo;
