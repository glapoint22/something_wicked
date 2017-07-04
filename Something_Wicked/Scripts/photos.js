//-------------------------------------------------------------------------------------Photos Controller-------------------------------------------------------------------------------------
app.controller('PhotosController', ['$scope', '$location', function ($scope, $location) {
    //Get the photos 
    $scope.deferred.promise.then(function (response) {
        $scope.photos = response.photos;
    });
    
    //Show the photos in the content window
    $scope.showPhotos = function (id) {
        //Set the url as photos
        $location.path('/photos/' + id);
    }
}]);
//-------------------------------------------------------------------------------------Slider Controller-------------------------------------------------------------------------------------
app.controller('SliderController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
    var slider, xPos, img;

    $http.get('SomethingWicked.asmx/GetPhotos', {
        params: {
            id: $routeParams.id
        }
    //Success
    }).then(function success(response) {
        var i, searchObject;

        //If there were no images
        if (response.data.list.length === 0) {
            $location.path('/');
            return;
        }

        //Set the photos
        $scope.list = response.data.list;
        $scope.photos = [];
        for (i = 0; i < $scope.list.length; i++) {
            $scope.photos.push(response.data.path + $routeParams.id + '/' + $scope.list[i]);
        }

        
        //Initialize the properties and variables
        $scope.contentWindow.title = response.data.title;
        slider = angular.element.find('.slider');
        $scope.contentWindow.show = true;

        //Check to see if an image is in the url
        searchObject = $location.search();
        if (searchObject.img === undefined) {
            //No image in the url so set as the first image in the list
            img = response.data.list[0].replace(/\.\w+/g, "");
            $location.search('img', img);
            xPos = 0;
            $scope.contentWindow.itemIndex = 0;
        } else {
            //Make sure this image exists
            $scope.contentWindow.itemIndex = -1;
            for (i = 0; i < response.data.list.length; i++) {
                if (searchObject.img === response.data.list[i].replace(/\.\w+/g, "")) {
                    $scope.contentWindow.itemIndex = i;
                    break;
                }
            }

            if ($scope.contentWindow.itemIndex === -1) {
                $location.path('/');
                return;
            }
                

            //Go to the image in the url
            xPos = $scope.contentWindow.itemIndex * -100;
            angular.element(slider).css({
                'transform': 'translateX(' + xPos + '%)'
            });
        }


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

        //Set the index of the current item
        $scope.contentWindow.itemIndex = Math.abs((xPos / 100) * -1);

        img = $scope.list[$scope.contentWindow.itemIndex].replace(/\.\w+/g, "");
        $location.search('img', img);

        //Translate the slider
        angular.element(slider).css({
            'transform': 'translateX(' + xPos + '%)'
        });
    }
}]);
//-----------------------------------------------------------------------------------Check Photo Loading Directive-------------------------------------------------------------------------------------
app.directive('checkPhotoLoading', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch('contentWindow.itemIndex === $index', function (newValue, oldValue) {
                if (newValue) {
                    if (!element[0].complete) scope.contentWindow.load = true;
                }
            });
            element.on('load', function () {
                if (scope.contentWindow.itemIndex === scope.$index) {
                    scope.contentWindow.load = false;
                    scope.$apply();
                }
            });
        }
    };
});