'use strict';
appConfig.registerModule('certification');

angular.module('certification')

.controller('printCtrl', ['$scope', 'APIService', '$stateParams',
    function($scope, APIService, $stateParams) {
        //$('body').addClass($scope.$state.current.name);
        var pattern = /num\=(\w+)$/;
        if (pattern.test(location.search)) {
            var no = location.search.match(pattern)[1];
            if(no) {
                APIService
                    .post('entry/report', {no: no})
                    .success(function (resp) {
                        $scope.info = resp;
                        setTimeout(function () {
                            $scope.toPdf();
                        }, 100);

                    });
            }
        } else {
            alert('参数不正确');
        }
        $scope.toPdf = function (){
            html2canvas(document.body, {
                onrendered: function(canvas) {
                    var dataURL = canvas.toDataURL("image/png");
                    var img = new Image();
                    $('#certification').remove();
                    document.body.appendChild(img);
                    img.src = dataURL;
                    //img.id = 'confirmfation-pdf'
                }
            });
        };
    }
]);