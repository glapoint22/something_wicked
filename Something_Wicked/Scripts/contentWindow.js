//-------------------------------------------------------------------------------------Content Window Controller-------------------------------------------------------------------------------------
app.controller('ContentWindowController', ['$scope', '$location', function ($scope, $location) {
    $scope.contentWindow = {
        show: false,
        title: '',
        load: false,
        itemIndex: 0
    };
    //Close the content window
    $scope.close = function () {
        $scope.contentWindow.show = false;
        $scope.contentWindow.load = false;
        $location.path('/');
    }

    $scope.stopPropagation = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
    }

    //Show the content window
    $scope.showContentWindow = function () {
        if ($location.url() === '/') $scope.contentWindow.show = false;
        return $scope.contentWindow.show;
    }
}]);