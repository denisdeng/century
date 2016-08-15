'use strict';
appConfig.registerModule('entry');

angular.module('entry').config([
    '$compileProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function($compileProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('entry',{
                url: "/entry",
                templateUrl: 'query/partials/entry.html',
                controller: 'entryCtrl'
            })
            .state('query', {
                url: "/",
                templateUrl: 'query/partials/query.html',
                controller: 'queryCtrl'
            });
        $urlRouterProvider.otherwise("/");
    }
])
.controller('entryCtrl', ['$scope', 'APIService', '$http',
    function($scope, APIService, $http) {
        $scope.download = function (){
             APIService
                .get('entry/download', {id: 'confirmation'})
                .success(function (resp) {
                    $scope.info = resp;
                });
        }
    }
])
.controller('queryCtrl', ['$scope', 'APIService', '$http',
    function($scope, APIService, $http) {
        $scope.info = null;
        $scope.query = function () {
            $scope.info = null;
            var cardNo = $scope.cardNo;
            if (cardNo) {
                APIService
                    .post('entry/query', {cardNo: cardNo})
                    .success(function (resp) {
                        $scope.info = resp;
                    });
            }
        };
    }
]);