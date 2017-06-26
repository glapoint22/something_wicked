//-------------------------------------------------------------------------------------Videos Controller-------------------------------------------------------------------------------------
app.controller('VideosController', ['$scope', '$location', function ($scope, $location) {
    //Get the video urls
    if ($scope.deferred) {
        $scope.deferred.promise.then(function (response) {
            $scope.videos = response.videos;
        });
    }
    

    //Show the video in the content window
    $scope.showVideo = function (id) {
        $location.path('/videos/' + id);
    }
}]);
//-------------------------------------------------------------------------------------Video Controller-------------------------------------------------------------------------------------
app.controller('VideoController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    //Get the bio
    $http.get('SomethingWicked.asmx/GetVideo', {
        params: {
            id: $routeParams.id
        }
    }).then(function (response) {
        //If there is no url
        if (response.data.url === null) {
            $location.path('/');
            return;
        }

        //Set the title and the video url
        $scope.contentWindow.title = response.data.title;
        $scope.url = response.data.url;
        $scope.contentWindow.show = true;
    });
}]);