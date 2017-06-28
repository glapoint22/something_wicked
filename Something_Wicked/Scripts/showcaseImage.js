//---------------------------------------------------------------------------------Showcase Controller-------------------------------------------------------------------------------------
app.controller('ShowcaseController', ['$scope', '$interval', function ($scope, $interval) {
    var nextImg;
    $scope.currentImage = 0;
    $scope.showcaseLoad = false;

    //Get an array of images that will be displayed in the showcase
    $scope.deferred.promise.then(function (response) {
        $scope.images = response.images;
        //Begin the slide show
        startSlide();
    });

    

    //This function starts the slide show
    function startSlide() {
        nextImg = $interval(function () {
            $scope.currentImage++;
            $scope.currentImage = $scope.currentImage % $scope.images.length;
        }, 10000);
    }

    //This function sets the next image to be displayed when the user clicks on the arrows
    $scope.setImage = function (direction) {
        //Reset the interval to show the next image
        $interval.cancel(nextImg);
        startSlide();

        //Set the next image to be displayed based on which arrow was clicked
        $scope.currentImage += direction;
        if ($scope.currentImage < 0) $scope.currentImage = $scope.images.length - 1;
        $scope.currentImage = $scope.currentImage % $scope.images.length;
    }
    
}]);
//------------------------------------------------------------------------------Set Height Directive-------------------------------------------------------------------------------------
app.directive('setHeight', function () {
    return {
        link: function (scope, element, attributes) {
            //Set the initial height
            setHeight();

            //If the browser window has been resized, reset the height
            angular.element(window).on('resize', function () {
                setHeight();
            });

            //If applicable, this function will set the height of the image container so the
            //images fit at the bottom of the browser window and do not extend beyond that point
            function setHeight() {
                var height, navBarHeight = 80, maxWindowWidth = 1920;

                //compute the height
                if (window.innerWidth > 1800 && window.innerHeight <= 1080) {
                    height = (window.innerHeight - navBarHeight) / maxWindowWidth * 100;
                } else {
                    height = 56.25;
                }

                //Set the height
                attributes.$set('style', 'height: ' + height + 'vw');
            }
        }
    }
});
//-----------------------------------------------------------------------------------Check Showcase Loading Directive-------------------------------------------------------------------------------------
app.directive('checkShowcaseLoading', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch('currentImage === $index', function (newValue, oldValue) {
                if (newValue) {
                    if (!element[0].complete) scope.$parent.showcaseLoad = true;
                }
            });
            element.on('load', function () {
                if (scope.currentImage === scope.$index) {
                    scope.$parent.showcaseLoad = false;
                    scope.$apply();
                }
            });
        }
    };
});