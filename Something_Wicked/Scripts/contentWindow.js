//-------------------------------------------------------------------------------------Content Window Controller-------------------------------------------------------------------------------------
app.controller('ContentWindowController', ['$scope', '$location', function ($scope, $location) {
    $scope.contentWindow = {
        show: false,
        title: '',
        load: false,
        itemIndex: 0
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
app.directive('checkLoading', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch('contentWindow.itemIndex === $index', function (newValue, oldValue) {
                if (newValue) {
                    if (!element[0].complete) scope.contentWindow.load = true;
                }
            });


            element.on('load', function () {
                if (scope.contentWindow.itemIndex === scope.$index) {
                    scope.contentWindow.load = false;
                    scope.$apply();
                }
            });
        }
    };
});