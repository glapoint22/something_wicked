//---------------------------------------------------------------------------------------Main-------------------------------------------------------------------------------------
var app = angular.module('somethingWicked', ['ngAnimate', 'ngRoute'])
.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    $locationProvider.html5Mode(true);
    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.
    'https://www.youtube.com/**'
    ]);
    $routeProvider
        .when('/videos', {
            template: '<iframe allowfullscreen src="{{url}}" width="100%" height="100%"></iframe>',
            controller: 'VideosController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
//-------------------------------------------------------------------------------------Main Controller-------------------------------------------------------------------------------------
app.controller('MainController', ['$location', function ($location) {
    $location.path('/');
}]);