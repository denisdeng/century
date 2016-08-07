angular.module(appConfig.appName)
    .factory('APIService', ['$http', 'APIServiceConfig', function($http, APIServiceConfig) {

        function _call(method) {
            return function(action, data, params) {
                var url = APIServiceConfig.endpoint + action;
                if (/^http[s]?:\/\//.test(action)) {
                    url = action;
                }
                var option = {
                    url: url,
                    method: method
                };
                if (data) {
                    if (method == 'GET' || method == 'JSONP') {
                        option.params = data;
                        if (method == 'JSONP') {
                            option.params['callback'] = 'JSON_CALLBACK';
                        }
                    } else {
                        option.data = data;
                    }
                }
                if (params) {
                    angular.forEach(params, function(value, key) {
                        option[key] = value;
                    });
                }
                if (APIServiceConfig.transform) {
                    APIServiceConfig.transform(option);
                }
                return $http(option);
            };
        }

        return {
            get: _call('GET'),
            post: _call('POST'),
            put: _call('PUT'),
            del: _call('DELETE'),
            jsonp: _call('JSONP')
        };

    }]);
