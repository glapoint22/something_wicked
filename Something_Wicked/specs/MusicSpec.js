describe('Music', function () {
    describe('MusicController', function () {
        beforeEach(module('somethingWicked'));

        var $controller, $scope, $location;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _$location_) {
            $controller = _$controller_;
            $location = _$location_;
            $scope = _$rootScope_.$new();
            $scope.deferred = _$q_.defer();
            $controller('MusicController', { $scope: $scope, $location: $location });
        }));



        it('Sets the songs', function () {
            $scope.deferred.resolve({
                songs: [{
                    artist: 'Artist1',
                    genre: 'Genre1',
                    name: 'Song1',
                    videoGroup: 'abc',
                    videoID: 'def'
                }]
            });
            $scope.$apply();

            expect($scope.songs[0].artist).toBe('Artist1');
            expect($scope.songs[0].genre).toBe('Genre1');
            expect($scope.songs[0].name).toBe('Song1');
            expect($scope.songs[0].videoGroup).toBe('abc');
            expect($scope.songs[0].videoID).toBe('def');
        });


        describe('sort function', function () {
            beforeEach(function () {
                $scope.sort('myColumn');
            });


            it('Sets the column in ascending order when first clicked', function () {
                expect($scope.isDescending).toBeFalsy();
            });

            it('Sets the column in descending order when clicked again', function () {
                $scope.sort('myColumn');
                expect($scope.isDescending).toBeTruthy();
            });
        });


        describe('getSortClass function', function () {
            var sortClass;

            it('Returns the css class "arrow-up" when a column is first clicked', function () {
                $scope.sort('myColumn');
                sortClass = $scope.getSortClass('myColumn');
                expect(sortClass).toBe('arrow-up');
            });

            it('Returns the css class "arrow-down" when the column is clicked again', function () {
                $scope.sort('myColumn');
                $scope.sort('myColumn');
                sortClass = $scope.getSortClass('myColumn');
                expect(sortClass).toBe('arrow-down');
            });


            it('Returns an empty string when another column is clicked', function () {
                $scope.sort('myColumn2');
                sortClass = $scope.getSortClass('myColumn');
                expect(sortClass).toBe('');
            });
        });


        describe('showVideo function', function () {
            var videoGroup = 'abc', id = 'def';

            it('Sets the url to the video container that was clicked', function () {
                $scope.showVideo(videoGroup, id);
                expect($location.url()).toBe('/videos/abc?video=def');
            });
        });
    });
});