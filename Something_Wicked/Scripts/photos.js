//-------------------------------------------------------------------------------------Photos Controller-------------------------------------------------------------------------------------
app.controller('PhotosController', ['$scope', '$location', function ($scope, $location) {
    //Get the photos 
    $scope.deferred.promise.then(function (response) {
        $scope.photos = response.photos;
    });
    
    //Show the photos in the content window
    $scope.showPhotos = function (id, title) {
        //Set the url as photos
        $location.path('/photos/' + id);
    }
}]);
//-------------------------------------------------------------------------------------Slider Controller-------------------------------------------------------------------------------------
app.controller('SliderController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
    var slider, xPos;

    $http.get('SomethingWicked.asmx/GetPhotos', {
        params: {
            id: $routeParams.id
        }
    //Success
    }).then(function success(response) {
        //If there were no images
        if (response.data.list.length === 0) {
            $location.path('/');
            return;
        }

        //Initialize the properties and variables
        $scope.photos = response.data.list;
        $scope.contentWindow.title = response.data.title;
        xPos = 0;
        slider = angular.element.find('.slider');
        $scope.contentWindow.show = true;

    //Fail
    }, function fail(response) {
        $location.path('/');
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