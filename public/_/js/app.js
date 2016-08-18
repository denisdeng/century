angular.module(appConfig.appName, appConfig.dependencies)
    .run(['$rootScope', '$location', '$http', '$state',
        function($rootScope, $location, $http, $state) {
            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeStart',function() {
                $('#confirmation-pdf').remove();
            })
        }
    ]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [appConfig.appName], {
        strictDi: true
    });
});
