app.controller('VideosController', ['$scope', '$http', 'contentWindow', function ($scope, $http, contentWindow) {
    //Get the video urls
    $http.get('SomethingWicked.asmx/GetVideos').then(function (response) {
        $scope.videos = response.data;
    });
    $scope.showVideo = function (title, url) {
        contentWindow.set(title, url);
    }
}]);