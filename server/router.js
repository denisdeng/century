'use strict';

var fs = require('fs');
var path = require('path');

var logger = require('./logger');

function loadApps() {
    var apps = [];
    var folders = fs.readdirSync(path.join(__dirname, 'apps'));
    for (let folder of folders) {
        let app = require('./apps/' + folder);
        logger.info('App "' + app.name + '" has been loaded.');
        if (! app.enable) {
            logger.warn('App "' + app.name + '" was disabled.');
        } else {
            apps.push(app);
        }
    }
    return apps;
}

function loadPages() {
    var pages = [];
    var folders = fs.readdirSync(path.join(__dirname, 'pages'));
    for (let folder of folders) {
        let router = require('./pages/' + folder + '/router');
        pages.push({
            name: folder,
            router: router
        });
    }
    return pages;
}

module.exports = {

    set: (motherApp) => {
        var apps = loadApps();
        for(let app of apps) {
            motherApp.use('/api/' + app.id, app.router);
        }
        logger.info(apps.length + ' app(s) have been loaded and registered.');
        var pages = loadPages();
        for(let page of pages) {
            motherApp.use('/api/' + page.name, page.router);
        }
    }

};
