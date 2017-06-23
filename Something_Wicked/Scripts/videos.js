//-------------------------------------------------------------------------------------Videos Controller-------------------------------------------------------------------------------------
app.controller('VideosController', ['$scope', 'contentWindow', '$location', '$rootScope', function ($scope, contentWindow, $location, $rootScope) {
    //Get the video urls
    if ($scope.deferred) {
        $scope.deferred.promise.then(function (response) {
            $scope.videos = response.videos;
        });
    }
    

    //Show the video in the content window
    $scope.showVideo = function (id) {
        $location.path('/videos/' + id);
    }
}]);
//-------------------------------------------------------------------------------------Video Controller-------------------------------------------------------------------------------------
app.controller('VideoController', ['$scope', '$http', '$location', '$rootScope', 'loading', '$routeParams', function ($scope, $http, $location, $rootScope, loading, $routeParams) {
    //Show the loading
    loading.show();


    //Get the bio
    $http.get('SomethingWicked.asmx/GetVideo', {
        params: {
            id: $routeParams.id
        }
    }).then(function (response) {
        ////If there is no bio
        //if (response.data.bio === null) {
        //    $location.path('/');
        //    loading.hide();
        //    return;
        //}


        $scope.contentWindow.title = response.data.title;
        $scope.url = response.data.url;
    });



    $rootScope.$on('$viewContentLoaded', function (event) {
        angular.element(document).find('iframe').on('load', function () {
            loading.hide();
            $scope.contentWindow.show = true;
            $scope.$apply();
        });
    });
}]);