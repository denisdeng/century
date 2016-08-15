angular.module(appConfig.appName)
    .controller('AppController',['$scope', function ($scope) {
        $scope.host = 'http://www.centurysportsbj.com:3006';
    }])
    .constant('APIServiceConfig', {
        endpoint: '/api/'
    });
