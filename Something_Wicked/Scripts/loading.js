//-------------------------------------------------------------------------------------Loading Service-------------------------------------------------------------------------------------
app.factory('loading', ['$compile', '$rootScope', '$q', function loadingFactory($compile, $rootScope, $q) {
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
            this.deferred.resolve();
        },
        deferred: $q.defer()
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