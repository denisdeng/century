angular.module(appConfig.appName)
    .controller('AppController',['$scope', function ($scope) {
        $scope.host = 'http://localhost:3006';
    }])
    .constant('APIServiceConfig', {
        endpoint: '/api/'
    });
