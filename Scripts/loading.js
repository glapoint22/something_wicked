//-------------------------------------------------------------------------------------Loading Service-------------------------------------------------------------------------------------
app.factory('loading', ['$compile', '$rootScope', function loadingFactory($compile, $rootScope) {
    return {
        show: function () {
            var scope = $rootScope.$new(true);
            this.scope = scope;
            scope.showLoading = true;

            //Compile and append it to the body
            var loading = $compile('<loading>')(scope);
            angular.element(document.body).append(loading);
        },
        hide: function () {
            this.scope.showLoading = false;
        }
    }
}]);
//-------------------------------------------------------------------------------------Loading Directive-------------------------------------------------------------------------------------
app.directive('loading', ['$animate', function ($animate) {
    return {
        restrict: 'E',
        templateUrl: 'Templates/loading.html',
        link: function (scope, element, attributes) {
            //This event is triggered when ng-hide is added
            //The loading directive is then destroyed
            $animate.on('addClass', element, function callback(ele, phase) {
                if (phase === 'close') {
                    scope.$destroy();
                    element.remove();
                }
            });
        }
    }
}]);