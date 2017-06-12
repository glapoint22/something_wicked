//-------------------------------------------------------------------------------------Photos Display Controller-------------------------------------------------------------------------------------
app.controller('PhotosController', ['$scope', '$http', 'contentWindow', '$location', function ($scope, $http, contentWindow, $location) {
    //Get the photos 
    $http.get('SomethingWicked.asmx/GetDisplayPhotos').then(function (response) {
        $scope.displayPhotos = response.data;
    });
    
    //Show the photos in the content window
    $scope.showPhotos = function (title, url) {
        //Set the content window
        contentWindow.set(title, url);

        //Set the url as photos
        $location.path('/photos');
    }
}]);


app.controller('PhotoController', ['$scope', 'photos', function ($scope, photos) {
    var slideCounter = 0;
    $scope.photos = photos;
    $scope.loadCounter = 0;

    $scope.moveSlide = function (direction) {
        var slide = angular.element.find('.slide');

        slideCounter = slideCounter + 1 * direction * 100;

        slideCounter = Math.min(0, slideCounter);
        slideCounter = Math.max(slideCounter, -($scope.photos.length -1) * 100);

        angular.element(slide).css({ 'transform': 'translateX(' + slideCounter + '%)' });

    }
       
}]);

app.directive('load', ['contentWindow', function (contentWindow) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('load', function () {
                scope.$parent.loadCounter++;
                if (scope.$parent.loadCounter === scope.$parent.photos.length) {
                    contentWindow.show();
                }
            });
            
        }
    };
}]);