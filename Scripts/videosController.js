app.controller('VideosController', ['$scope', '$http', '$compile', function ($scope, $http, $compile) {
    //Get the video urls
    $http.get('SomethingWicked.asmx/GetVideos').then(function (response) {
        $scope.videos = response.data;
    });
    

    $scope.showVideo = function (title, url) {
        $scope.title = title;

        //Create the modal frame with the youtube player embeded into the iframe
        var modalFrame = [
            '<modal-frame ng-show="true" class="ng-hide">',
                '<iframe allowfullscreen src="' + url + '" width="60%" height="60%"></iframe>',
            '</modal-frame>'
        ].join('\n')

        //Compile and append it to the body
        var modalFrame = $compile(modalFrame)($scope);
        angular.element(document.body).append(modalFrame);
    }
}]);