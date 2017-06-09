//-------------------------------------------------------------------------------------Content Window Service-------------------------------------------------------------------------------------
app.factory('contentWindow', ['loading', '$rootScope', '$compile', '$location', function contentWindowFactory(loading, $rootScope, $compile, $location) {
    return {
        //Function to initialize and set up the content window
        set: function (title, url) {
            var scope, contentWindow;
            
            //Create a new scope for the content window
            scope = $rootScope.$new(true);
            
            //Initialize the properties
            scope.showWindow = false;
            scope.title = title;
            scope.url = url;

            //Create the content window directive
            contentWindow = $compile('<content-window>')(scope);
            angular.element(document.body).append(contentWindow);

            //Show the loading screen
            loading.show();

            //Function for closing the content window
            scope.close = function () {
                scope.showWindow = false;
                $location.path('/');
            }

            //Assign the current scope to this object
            this.scope = scope;
        },
        //Function to show the content window
        show: function () {
            loading.hide();
            this.scope.showWindow = true;
            this.scope.$apply();
        }
    }
}]);
//-------------------------------------------------------------------------------------Content Window Directive-------------------------------------------------------------------------------------
app.directive('contentWindow', ['$animate', function ($animate) {
    return {
        restrict: 'E',
        templateUrl: 'Templates/contentWindow.html',
        link: function (scope, element, attributes) {
            //This event is triggered when ng-hide is added
            //The content window is then destroyed
            $animate.on('addClass', element, function callback(ele, phase) {
                if (phase === 'close') {
                    scope.$destroy();
                    element.remove();
                }
            });
        }
    }
}]);