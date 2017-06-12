//---------------------------------------------------------------------------------------Main-------------------------------------------------------------------------------------
var app = angular.module('somethingWicked', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
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
        .when('/photos', {
            templateUrl: 'Templates/photos.html',
            controller: 'SliderController',
            resolve: {
                photos: ['$http', 'contentWindow', function ($http, contentWindow) {
                    return $http.get('SomethingWicked.asmx/GetPhotos', {
                        params: {
                            photosDir: contentWindow.scope.url
                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
//-------------------------------------------------------------------------------------Main Controller-------------------------------------------------------------------------------------
app.controller('MainController', ['$location', function ($location) {
    $location.path('/');
}]);