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
            })
            .state('print', {
                url: "/print/:id",
                templateUrl: 'query/partials/confirmation.html',
                controller: 'printCtrl'
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
])
.controller('printCtrl', ['$scope', 'APIService', '$stateParams',
    function($scope, APIService, $stateParams) {
        $('body').addClass($scope.$state.current.name);
        var cardNo = $stateParams.id;
        if(cardNo) {
            APIService
                .post('entry/query', {cardNo: cardNo})
                .success(function (resp) {
                    $scope.info = resp;
                    setTimeout(function () {
                        $scope.toPdf();
                    }, 100);

                });
        }
        $scope.toPdf = function (){
            html2canvas(document.body, {
                onrendered: function(canvas) {
                    var dataURL = canvas.toDataURL();
                    $('#confirmation').remove();
                    document.body.appendChild(canvas);
                }
            });
        };
    }
]);
