//-------------------------------------------------------------------------------------Photos Controller-------------------------------------------------------------------------------------
app.controller('PhotosController', ['$scope', '$location', function ($scope, $location) {
    //Get the photos 
    $scope.deferred.promise.then(function (response) {
        $scope.photos = response.photos;
    });
    
    //Show the photos in the content window
    $scope.showPhotos = function (id, title) {
        //Set the url as photos
        $location.path('/photos/' + title + '/' + id);
    }
}]);
//-------------------------------------------------------------------------------------Slider Controller-------------------------------------------------------------------------------------
app.controller('SliderController', ['$scope', '$http', '$routeParams', 'loading', '$location', function ($scope, $http, $routeParams, loading, $location) {
    var slider, xPos;
    loading.show();

    $http.get('SomethingWicked.asmx/GetPhotos', {
        params: {
            photosDirectory: 'Images/Photos/' + $routeParams.id + '/'
        }
    }).then(function success(response) {
        if (response.data.length === 0) {
            $location.path('/');
            loading.hide();
            return;
        }


        //Initialize the properties and variables
        $scope.photos = response.data;
        xPos = 0;
        slider = angular.element.find('.slider');
        $scope.loadCounter = 0;
    }, function fail(response) {
        $location.path('/');
        loading.hide();
    });

    loading.deferred.promise.then(function () {
        $scope.contentWindow.title = $routeParams.title;
        $scope.contentWindow.show = true;
    });

    

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
app.directive('checkLoading', ['loading', function (loading) {
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
                    loading.hide();
                    scope.$apply();
                }
            });
            
        }
    };
}]);