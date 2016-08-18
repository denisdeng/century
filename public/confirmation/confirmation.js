'use strict';
appConfig.registerModule('confirmation');

angular.module('confirmation')

.controller('printCtrl', ['$scope', 'APIService', '$stateParams',
    function($scope, APIService, $stateParams) {
        //$('body').addClass($scope.$state.current.name);
        var pattern = /num\=(\w+)$/;
        if (pattern.test(location.search)) {
            var cardNo = location.search.match(pattern)[1];
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
        } else {
            alert('参数不正确');
        }
        $scope.toPdf = function (){
            html2canvas(document.body, {
                onrendered: function(canvas) {
                    var dataURL = canvas.toDataURL("image/png");
                    var img = new Image();
                    $('#confirmation').remove();
                    document.body.appendChild(canvas);
                    img.src = dataURL;
                    //img.id = 'confirmfation-pdf';
                }
            });
        };
    }
]);