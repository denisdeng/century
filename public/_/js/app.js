angular.module(appConfig.appName, appConfig.dependencies)
    .run(['$rootScope', '$location', '$http', '$state',
        function($rootScope, $location, $http, $state) {
            $rootScope.$state = $state;
        }
    ]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [appConfig.appName], {
        strictDi: true
    });
});
