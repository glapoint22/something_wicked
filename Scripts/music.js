//------------------------------------------------------------------------------Music Controller-------------------------------------------------------------------------------------
app.controller('MusicController', ['$scope', 'contentWindow', '$location', '$rootScope', function ($scope, contentWindow, $location, $rootScope) {
    //Get the song list
    $scope.deferred.promise.then(function (response) {
        $scope.songs = response.songs;
    });

    //Initialize the sorting properties
    $scope.sortColumn = 'name';
    $scope.isDescending = false;
    $scope.sortClass = '';

    //Function used for sorting the columns
    $scope.sort = function (column) {
        $scope.isDescending = (column === $scope.sortColumn) ? !$scope.isDescending : false;
        $scope.sortColumn = column;
    }

    //Function used for displaying the sorting arrows
    $scope.getSortClass = function (column) {
        if (column === $scope.sortColumn) {
            return ($scope.isDescending) ? 'arrow-down' : 'arrow-up';
        }
        return '';
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