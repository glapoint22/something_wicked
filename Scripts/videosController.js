app.controller('VideosController', ['$scope', '$http', function ($scope, $http) {
    //Get the videos
    $http.get('SomethingWicked.asmx/GetVideos').then(function (response) {
        $scope.videos = response.data;
        
    });
}]);