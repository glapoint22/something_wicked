//-------------------------------------------------------------------------------------Content Window Controller-------------------------------------------------------------------------------------
app.controller('ContentWindowController', ['$scope', '$location', function ($scope, $location) {
    $scope.contentWindow = {
        show: false,
        title: '',
        isLoading: true
    };

    $scope.close = function () {
        $scope.contentWindow.show = false;
        $location.path('/');
    }

    $scope.stopPropagation = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
    }

    $scope.showContentWindow = function () {
        if ($location.url() === '/') $scope.contentWindow.show = false;
        return $scope.contentWindow.show;
    }
}]);
//-----------------------------------------------------------------------------------Check Loading Directive-------------------------------------------------------------------------------------
app.directive('checkLoading',function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('load', function () {
                console.log(scope.$index);
                //loading.hide();
                //scope.$apply();
            });
        }
    };
});