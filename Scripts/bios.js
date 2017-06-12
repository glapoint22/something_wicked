//-------------------------------------------------------------------------------------Members Controller-------------------------------------------------------------------------------------
app.controller('MembersController', ['$scope', '$http', function ($scope, $http) {
    //Get the photos 
    $http.get('SomethingWicked.asmx/GetMembers').then(function (response) {
        $scope.members = response.data;
    });
}]);