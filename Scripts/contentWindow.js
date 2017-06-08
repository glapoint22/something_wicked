app.factory('contentWindow', ['load', function contentWindowFactory(load) {
    return {
        set: function (title, url) {
            var content = [
                '<content-window ng-show="showContent" class="ng-hide" title="' + title + '">',
                    '<iframe allowfullscreen src="' + url + '" width="60%" height="60%"></iframe>',
                '</content-window>'
            ].join('\n');
            load.start(content);
        }
    }
}]);
app.directive('contentWindow', ['load', function (load) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        templateUrl: 'Templates/contentWindow.html',
        link: function (scope, element, attributes) {
            angular.element(document).find('iframe').on('load', function () {
                load.end();
                scope.$parent.showContent = true;
                scope.$apply();
            });
        }
    }
}]);