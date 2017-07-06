describe('Music', function () {
    beforeEach(module('somethingWicked'));

    var $controller, scope, $rootScope, $q, sortClass, $location;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _$location_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        $location = _$location_;
        scope = $rootScope.$new();
        scope.deferred = $q.defer();
        $controller('MusicController', { $scope: scope, $location: $location});
    }));


    
    it('Songs should have the correct data', function () {
        scope.deferred.resolve({
            songs: [{
                artist: 'Artist1',
                genre: 'Genre1',
                name: 'Song1',
                videoGroup: 'abc',
                videoID: 'def'
            }]
        });
        scope.$apply();

        expect(scope.songs[0].artist).toBe('Artist1');
        expect(scope.songs[0].genre).toBe('Genre1');
        expect(scope.songs[0].name).toBe('Song1');
        expect(scope.songs[0].videoGroup).toBe('abc');
        expect(scope.songs[0].videoID).toBe('def');
    });
    

    describe('Sort function', function () {
        beforeEach(function () {
            scope.sort('myColumn');
        });


        it('Column is in ascending order when first clicked', function () {
            expect(scope.isDescending).toBeFalsy();
        });

        it('Column is in descending order when clicked again', function () {
            scope.sort('myColumn');
            expect(scope.isDescending).toBeTruthy();
        });
    });


    describe('GetSortClass function', function () {
        it('Returns the css class "arrow-up" when a column is first clicked', function () {
            scope.sort('myColumn');
            sortClass = scope.getSortClass('myColumn');
            expect(sortClass).toBe('arrow-up');
        });

        it('Returns the css class "arrow-down" when the column is clicked again', function () {
            scope.sort('myColumn');
            scope.sort('myColumn');
            sortClass = scope.getSortClass('myColumn');
            expect(sortClass).toBe('arrow-down');
        });


        it('Returns empty string when another column is clicked', function () {
            scope.sort('myColumn2');
            sortClass = scope.getSortClass('myColumn');
            expect(sortClass).toBe('');
        });
    });


    describe('ShowVideo function', function () {
        var videoGroup = 'abc', id = 'def';

        it('Sets the url to the video that was clicked', function () {
            scope.showVideo(videoGroup, id);
            expect($location.url()).toBe('/videos/abc?video=def');
        });
    });
});