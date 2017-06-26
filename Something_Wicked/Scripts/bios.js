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
app.controller('BiosController', ['$scope', '$sce', '$http', '$routeParams', '$location', function ($scope, $sce, $http, $routeParams, $location) {
    //Get the bio
    $http.get('SomethingWicked.asmx/GetBio', {
        params: {
            name: $routeParams.name
        }
    }).then(function (response) {
        //If there is no bio
        if (response.data.bio === null) {
            $location.path('/');
            return;
        }

        //Using $sce service so markup can be used in the bio text
        $scope.bio = $sce.trustAsHtml(response.data.bio);

        $scope.contentWindow.title = response.data.name;
        $scope.thumbnail = response.data.thumbnail;

        $scope.contentWindow.show = true;
    });
}]);