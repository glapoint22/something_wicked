describe('Tour', function () {
    describe('TourController', function () {
        beforeEach(module('somethingWicked'));
        var $scope;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
            $scope = _$rootScope_.$new();
            $scope.deferred = _$q_.defer();
            _$controller_('TourController', { $scope: $scope });
        }));

        it('Sets the shows', function () {
            $scope.deferred.resolve({
                shows: [{
                    URL: 'https://www.google.com/maps/place/411+Geyser+Rd,+Ballston+Spa,+NY+12020/@43.047724,-73.8458277,17z/data=!3m1!4b1!4m5!3m4!1s0x89de477d344304cb:0xc57eb2f6e0b6b5a0!8m2!3d43.047724!4d-73.843639',
                    dateTime: 1500764400000,
                    duration: 4,
                    location: '411 Geyser Rd, Ballston Spa, NY 12020',
                    venue: 'Dozer\'s'
                }]
            });
            $scope.$digest();

            expect($scope.shows[0].date).toEqual(new Date('Sat Jul 22 2017 19:00:00 GMT-0400 (Eastern Daylight Time)'));
            expect($scope.shows[0].endTime).toEqual(new Date('Sat Jul 22 2017 23:00:00 GMT-0400 (Eastern Daylight Time)'));
            expect($scope.shows[0].startTime).toEqual(new Date('Sat Jul 22 2017 19:00:00 GMT-0400 (Eastern Daylight Time)'));
            expect($scope.shows[0].venue).toEqual({
                URL: 'https://www.google.com/maps/place/411+Geyser+Rd,+Ballston+Spa,+NY+12020/@43.047724,-73.8458277,17z/data=!3m1!4b1!4m5!3m4!1s0x89de477d344304cb:0xc57eb2f6e0b6b5a0!8m2!3d43.047724!4d-73.843639',
                location: '411 Geyser Rd, Ballston Spa, NY 12020',
                name: 'Dozer\'s'
            });
        });
    });
});