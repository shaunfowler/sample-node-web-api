angular.module('app', ['ngRoute']);

angular.module('app').config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'profile.html',
            controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {

                var errorCallback = function (error) {
                    if (error.status === 401) {
                        $location.path('/login');
                    }
                };

                $http.get('http://localhost:3000/user').then(function (response) {
                    $scope.user = response.data;
                }, errorCallback);

                $http.get('http://localhost:3000/api/items').then(function (response) {
                    $scope.data = response.data;
                }, errorCallback);

            }]
        }).when('/login', {
            templateUrl: 'login.html',
            controller: function () { }
        });

    }]);