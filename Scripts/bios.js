//-------------------------------------------------------------------------------------Members Controller-------------------------------------------------------------------------------------
app.controller('MembersController', ['$scope', '$http', 'contentWindow', '$location', '$rootScope', function ($scope, $http, contentWindow, $location, $rootScope) {
    //Get the photos 
    $http.get('SomethingWicked.asmx/GetMembers').then(function (response) {
        $scope.members = response.data;
    });

    $scope.showBio = function (name, memberID) {
        contentWindow.set(name, memberID);

        $location.path('/bios');
        $rootScope.$on('$viewContentLoaded', function (event) {
            contentWindow.show();
        });
    }
}]);
//-------------------------------------------------------------------------------------Bios Controller-------------------------------------------------------------------------------------
app.controller('BiosController', ['$scope', 'bio', function ($scope, bio) {
    $scope.bio = bio;
}]);