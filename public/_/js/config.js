'use strict';
var appConfig = (function(){
    // 应用程序名和依赖
    var appName = 'century';
    var dependencies = [
        'ui.router',                    // Routing
        'ui.bootstrap'                // Ui Bootstrap
    ];
    // 添加新模块
    var registerModule = function(moduleName, dependencies) {
        angular.module(moduleName, dependencies || []);
        angular.module(appName).requires.push(moduleName);
    };
    return {
        appName: appName,
        dependencies: dependencies,
        registerModule: registerModule
    };
})();