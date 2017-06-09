//------------------------------------------------------------------------------Music Controller-------------------------------------------------------------------------------------
app.controller('MusicController', ['$scope', '$http', function ($scope, $http) {
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
}]);