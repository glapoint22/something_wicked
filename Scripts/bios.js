//-------------------------------------------------------------------------------------Members Controller-------------------------------------------------------------------------------------
app.controller('MembersController', ['$scope', '$http', 'contentWindow', '$location', '$rootScope', function ($scope, $http, contentWindow, $location, $rootScope) {
    $scope.deferred.promise.then(function (response) {
        $scope.members = response.members;
    });

    $scope.showBio = function (name, memberID, thumbnail) {
        contentWindow.set({ title: name, memberID: memberID, thumbnail: thumbnail });

        $location.path('/bios');
        $rootScope.$on('$viewContentLoaded', function (event) {
            contentWindow.show();
        });
    }
}]);
//-------------------------------------------------------------------------------------Bios Controller-------------------------------------------------------------------------------------
app.controller('BiosController', ['$scope', 'bio', '$sce', function ($scope, bio, $sce) {
    //Using $sce service so markup can be used in the bio text
    $scope.bio = $sce.trustAsHtml(bio);
}]);