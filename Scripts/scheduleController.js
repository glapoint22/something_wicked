app.controller('ScheduleController', ['$scope', '$http', function ($scope, $http) {
    $http.get('SomethingWicked.asmx/GetSchedule').then(function (response) {
        var i, date;

        $scope.shows = [];
        
        
        for (i = 0; i < response.data.length; i++) {
            date = new Date(response.data[i].dateTime);
            $scope.shows.push({
                date: date,
                startTime: date,
                endTime: new Date(new Date(date).setHours(date.getHours() + response.data[i].duration)),
                venue: {
                    name: response.data[i].venue,
                    location: response.data[i].location,
                    URL: response.data[i].URL
                }
            })
        }
    });
}]);