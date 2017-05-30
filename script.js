/// <reference path="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js" />

var app = angular.module('somethingWicked', ['ngAnimate'])
.controller('ImageController', ['$scope', '$interval', '$http', function ($scope, $interval, $http) {
    var nextImg;

    $scope.currentImage = 0;

    startSlide();


    $scope.setImage = function (counter) {
        $interval.cancel(nextImg);
        startSlide();

        $scope.currentImage += counter;
        if ($scope.currentImage < 0) $scope.currentImage = $scope.images.length - 1;
        $scope.currentImage = $scope.currentImage % $scope.images.length;
    }

    $http.get('SomethingWicked.asmx/GetImages').then(function (response) {
        $scope.images = response.data;
    });


    function startSlide() {
        nextImg = $interval(function () {
            $scope.currentImage++;
            $scope.currentImage = $scope.currentImage % $scope.images.length;
        }, 10000);
    }
    
}])

.directive('setHeight', function () {
    return {
        link: function (scope, element, attributes) {
            setHeight();

            function setHeight() {
                var height;

                if (window.innerWidth > 1800 && window.innerHeight <= 1080) {
                    height = (window.innerHeight - 80) / 1920 * 100;
                } else {
                    height = 56.25;
                }

                attributes.$set('style', 'height: ' + height + 'vw');
            }
            

            angular.element(window).on('resize', function () {
                setHeight();
            });
        }
    }
});
