//------------------------------------------------------------------------------Music Controller-------------------------------------------------------------------------------------
app.controller('MusicController', ['$scope', '$http', 'contentWindow', '$location', '$rootScope', function ($scope, $http, contentWindow, $location, $rootScope) {
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

    //Get the song list
    $http.get('SomethingWicked.asmx/GetMusic').then(function (response) {
        $scope.songs = response.data;
    });

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