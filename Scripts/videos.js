//-------------------------------------------------------------------------------------Videos Controller-------------------------------------------------------------------------------------
app.controller('VideosController', ['$scope', 'contentWindow', '$location', '$rootScope', function ($scope, contentWindow, $location, $rootScope) {
    //Get the video urls
    if ($scope.deferred) {
        $scope.deferred.promise.then(function (response) {
            $scope.videos = response.videos;
        });
    }
    

    //Show the video in the content window
    $scope.showVideo = function (title, url) {
        contentWindow.set({ title: title, url: url });

        $location.path('/videos');
        $rootScope.$on('$viewContentLoaded', function (event) {
            angular.element(document).find('iframe').on('load', function () {
                contentWindow.show();
                $scope.$apply();
            });
        });
    }
}]);