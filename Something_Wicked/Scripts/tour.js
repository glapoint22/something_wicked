//------------------------------------------------------------------------------Tour Controller-------------------------------------------------------------------------------------
app.controller('TourController', ['$scope', function ($scope) {
    $scope.deferred.promise.then(function (response) {
        var i, date, shows;

        $scope.shows = [];
        shows = response.shows;

        //Populate the shows array
        for (i = 0; i < shows.length; i++) {
            date = new Date(shows[i].dateTime);
            $scope.shows.push({
                date: date,
                startTime: date,
                endTime: new Date(new Date(date).setHours(date.getHours() + shows[i].duration)),
                venue: {
                    name: shows[i].venue,
                    location: shows[i].location,
                    URL: shows[i].URL
                }
            })
        }
    });
}]);