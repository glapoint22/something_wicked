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
    var slider, xPos, i, searchObject, index;

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

        //Check to see if an image is the url
        searchObject = $location.search();
        if (searchObject.img === undefined) {
            //No image in the url so set as the first image in the list
            $location.search('img', response.data.list[0]);
            xPos = 0;
        } else {
            //Make sure this image exists
            index = response.data.list.indexOf(searchObject.img);
            if (index === -1) $location.path('/');

            //Go to the image in the url
            xPos = index * -100;
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

        $location.search('img', $scope.list[$scope.contentWindow.itemIndex]);

        //Translate the slider
        angular.element(slider).css({
            'transform': 'translateX(' + xPos + '%)'
        });
    }
}]);