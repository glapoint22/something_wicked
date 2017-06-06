app.directive('modalFrame', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'Templates/modalFrame.html',
        link: function (scope, element, attributes) {
            //Show the loading spinner
            angular.element(document).find('.modal-background').prepend('<div id="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw loading" aria-hidden="true"></div>')

            //When the iframe loads, remove the loading spinner
            angular.element(document).find('iframe').on('load', function () {
                angular.element(document).find('#loading').remove();
            });
        }
    }
});