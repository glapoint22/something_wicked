//-------------------------------------------------------------------------------------Members Controller-------------------------------------------------------------------------------------
app.controller('MembersController', ['$scope', '$location', function ($scope, $location) {
    $scope.deferred.promise.then(function (response) {
        $scope.members = response.members;
    });

    $scope.showBio = function (name) {
        $location.path('/bios/' + name);
    }
}]);
//-------------------------------------------------------------------------------------Bios Controller-------------------------------------------------------------------------------------
app.controller('BiosController', ['$scope', '$sce', '$http', '$routeParams', 'loading', '$location', function ($scope, $sce, $http, $routeParams, loading, $location) {
    //Show the loading
    loading.show();

    //Get the bio
    $http.get('SomethingWicked.asmx/GetBio', {
        params: {
            name: $routeParams.name
        }
    }).then(function (response) {
        //If there is no bio
        if (response.data.bio === null) {
            $location.path('/');
            loading.hide();
            return;
        }

        //Using $sce service so markup can be used in the bio text
        $scope.bio = $sce.trustAsHtml(response.data.bio);

        $scope.contentWindow.title = response.data.title;
        $scope.thumbnail = response.data.thumbnail;
    });

    //Stop loading and show the content window
    $scope.$on('$viewContentLoaded', function (event) {
        loading.hide();
        $scope.contentWindow.show = true;
    });
}]);