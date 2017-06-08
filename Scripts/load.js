app.factory('load', ['$compile', '$rootScope', function loadFactory($compile, $rootScope) {
    return {
        start: function (content) {
            var scope = $rootScope.$new(true);
            this.scope = scope;
            scope.showLoading = true;
            scope.content = content;

            //Compile and append it to the body
            var loading = $compile('<loading>')(scope);
            angular.element(document.body).append(loading);
        },
        end: function () {
            this.scope.showLoading = false;
        }
    }
}]);



app.directive('loading', ['$compile', '$animate', '$rootScope', function ($compile, $animate, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'Templates/loading.html',
        link: function (scope, element, attributes) {
            var newScope = $rootScope.$new(true);
            angular.element(document.body).append($compile(scope.content)(newScope));

            $animate.on('addClass', element, function callback(ele, phase) {
                if (phase === 'close') {
                    scope.$destroy();
                    element.remove();
                }
            });
        }
    }
}]);