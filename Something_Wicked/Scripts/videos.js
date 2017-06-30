//-------------------------------------------------------------------------------------Videos Controller-------------------------------------------------------------------------------------
app.controller('VideosController', ['$scope', '$location', function ($scope, $location) {
    //Get the video urls
    if ($scope.deferred) {
        $scope.deferred.promise.then(function (response) {
            $scope.videos = response.videos;
        });
    }
    

    //Show the video in the content window
    $scope.showVideos = function (id) {
        $location.path('/videos/' + id);
    }
}]);
//-------------------------------------------------------------------------------------Video Controller-------------------------------------------------------------------------------------
app.controller('VideoController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.index = 0;
    $scope.iframe = angular.element(document.body).find('iframe');

    //Get the videos
    $http.get('SomethingWicked.asmx/GetVideos', {
        params: {
            groupID: $routeParams.id
        }
    //Success
    }).then(function success(response) {
        //Initialize the properties and variables
        $scope.videos = response.data.videos;
        $scope.contentWindow.title = response.data.title;
        $scope.contentWindow.show = true;

        //Check to see if the video id is in the url
        searchObject = $location.search();
        if (searchObject.video === undefined) {
            //No video id in the url so set as the first video in the list
            $location.search('video', $scope.videos[0].id);
            $scope.iframe.attr('src', $scope.videos[0].url);
        } else {
            //Make sure this video exists
            $scope.index = -1;
            for (var i = 0; i < $scope.videos.length; i++) {
                if (searchObject.video === $scope.videos[i].id) {
                    $scope.index = i;
                    break;
                }
            }

            //If no video id is found, return
            if ($scope.index === -1) {
                $location.path('/');
                return;
            }

            //Set the video
            $location.search('video', $scope.videos[$scope.index].id);
            $scope.iframe.attr('src', $scope.videos[$scope.index].url);
        }
    //Fail
    }, function fail(response) {
        $location.path('/');
    });

    //Set the video based on which arrow was pressed
    $scope.setVideo = function (dir) {
        $scope.contentWindow.load = true;
        $scope.index += dir;

        $location.search('video', $scope.videos[$scope.index].id);
        $scope.iframe.attr('src', $scope.videos[$scope.index].url);
    }
}]);
//-------------------------------------------------------------------------------------Check Video Loading-------------------------------------------------------------------------------------
app.directive('checkVideoLoading', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.contentWindow.load = true;
            element.on('load', function () {
                scope.contentWindow.load = false;
                scope.$apply();
            });
        }
    };
});