'use strict';

var config = {

    dev: {
        env: 'dev',
        port: 3005,
        mongodbURL: 'mongodb://localhost/century-dev',
        gridfsRoot: 'file-manager-fs'
    },

    prod: {
        env: 'prod',
        port: 3005
    }

};

var env = process.env.NODE_ENV || 'dev';

module.exports = config[env];
