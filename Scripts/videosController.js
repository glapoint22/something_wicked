//-------------------------------------------------------------------------------------Videos Controller-------------------------------------------------------------------------------------
app.controller('VideosController', ['$scope', '$http', 'contentWindow', '$location', '$rootScope', function ($scope, $http, contentWindow, $location, $rootScope) {
    //Get the video urls
    $http.get('SomethingWicked.asmx/GetVideos').then(function (response) {
        $scope.videos = response.data;
    });
    $scope.showVideo = function (title, url) {
        contentWindow.set(title, url);

        $location.path('/videos');
        $rootScope.$on('$viewContentLoaded', function (event) {
            angular.element(document).find('iframe').on('load', function () {
                contentWindow.show();
            });
        });
    }
}]);