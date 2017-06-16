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
            template: '<iframe allowfullscreen src="{{content.url}}" width="100%" height="100%"></iframe>',
            controller: 'VideosController'
        })
        .when('/photos', {
            templateUrl: 'Templates/photos.html',
            controller: 'SliderController',
            resolve: {
                photos: ['$http', 'contentWindow', function ($http, contentWindow) {
                    return $http.get('SomethingWicked.asmx/GetPhotos', {
                        params: {
                            photosDirectory: contentWindow.content.photosDirectory
                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }]
            }
        })
        .when('/bios', {
            templateUrl: 'Templates/bio.html',
            controller: 'BiosController',
            resolve: {
                bio: ['$http', 'contentWindow', function ($http, contentWindow) {
                    return $http.get('SomethingWicked.asmx/GetBio', {
                        params: {
                            memberID: contentWindow.content.memberID
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
app.controller('MainController', ['$scope', '$location', '$timeout', '$http', '$q', function ($scope, $location, $timeout, $http, $q) {
    //Default location
    $location.path('/');

    //Get all the data
    $scope.deferred = $q.defer();
    $http.get('SomethingWicked.asmx/GetData').then(function (response) {
        $scope.deferred.resolve(response.data);
    });

    //Function used for scrolling to the sections on the page
    $scope.scrollTo = function (id) {
        var yOffset = 10,
            duration = 500,
            element = document.getElementById(id),
            rect = element.getBoundingClientRect(),
            elementPos = rect.top,
            body = document.scrollingElement || document.documentElement,
            to = elementPos + body.scrollTop - yOffset,
            start = body.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20,
            animateScroll = function () {
                var val;

                currentTime += increment;
                val = easeInOutQuad(currentTime, start, change, duration);
                body.scrollTop = val;
                if (currentTime < duration) {
                    $timeout(animateScroll, increment);
                }
            };
            animateScroll();
       

        //t = current time
        //b = start value
        //c = change in value
        //d = duration
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    }
}]);