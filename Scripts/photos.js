//-------------------------------------------------------------------------------------Photos Controller-------------------------------------------------------------------------------------
app.controller('PhotosController', ['$scope', 'contentWindow', '$location', function ($scope, contentWindow, $location) {
    //Get the photos 
    $scope.deferred.promise.then(function (response) {
        $scope.photos = response.photos;
    });
    
    //Show the photos in the content window
    $scope.showPhotos = function (title, url) {
        //Set the content window
        contentWindow.set({ title: title, photosDirectory: url });

        //Set the url as photos
        $location.path('/photos');
    }
}]);
//-------------------------------------------------------------------------------------Slider Controller-------------------------------------------------------------------------------------
app.controller('SliderController', ['$scope', 'photos', function ($scope, photos) {
    var slider, xPos;

    //Initialize the properties and variables
    xPos = 0;
    slider = angular.element.find('.slider');
    $scope.photos = photos;
    $scope.loadCounter = 0;

    //This function moves the slider left and right when the arrow buttons are pressed
    $scope.moveSlider = function (direction) {
        //Calculate the position of the slider
        xPos = xPos + 1 * direction * 100;

        //Set the constraints
        xPos = Math.min(0, xPos);
        xPos = Math.max(xPos, -($scope.photos.length - 1) * 100);

        //Translate the slider
        angular.element(slider).css({
            'transform': 'translateX(' + xPos + '%)'
        });
    }
}]);
//-----------------------------------------------------------------------------------Check Loading Directive-------------------------------------------------------------------------------------
app.directive('checkLoading', ['contentWindow', function (contentWindow) {
    //This directive is used to check when all images are loaded.
    //When all images are loaded, show the content window
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //When this image is loaded, check to see if this is the last image to be loaded.
            //If so, show the content window
            element.on('load', function () {
                scope.$parent.loadCounter++;
                if (scope.$parent.loadCounter === scope.$parent.photos.length) {
                    contentWindow.show();
                    scope.$apply();
                }
            });
            
        }
    };
}]);