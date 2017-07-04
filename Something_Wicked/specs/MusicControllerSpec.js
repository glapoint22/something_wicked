describe('MusicController', function () {
    beforeEach(module('somethingWicked'));

    var $controller, scope, $rootScope, $q, sortClass;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        scope = $rootScope.$new();
        scope.deferred = $q.defer();
        $controller('MusicController', { $scope: scope });
    }));


    describe('songs', function () {
        
        beforeEach(function () {
            scope.deferred.resolve({ songs: ['Song1', 'Song2'] });
            scope.$apply();
        });
        it('Songs should be defined', function () {
            expect(scope.songs).toBeDefined();
        });
    });

    describe('sort', function () {
        beforeEach(function () {
            scope.sort('myColumn');
            sortClass = scope.getSortClass('myColumn');
        });


        it('Column is in ascending order when first clicked', function () {
            expect(scope.isDescending).toBeFalsy();
        });

        it('Column is in descending order when clicked again', function () {
            scope.sort('myColumn');
            expect(scope.isDescending).toBeTruthy();
        });
    });


    describe('getSortClass', function () {
        beforeEach(function () {
            scope.sort('myColumn');
            sortClass = scope.getSortClass('myColumn');
        });
        it('Returns the css class "arrow-up" when a column is first clicked', function () {
            expect(sortClass).toBe('arrow-up');
        });

        it('Returns the css class "arrow-down" when the column is clicked again', function () {
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

    describe('showVideo', function () {
        var videoGroup = 'abc', id = 'def', $location;

        beforeEach(inject(function (_$location_) {
            $location = _$location_;
        }));

        it('Sets the url to the video that was clicked', function () {
            scope.showVideo(videoGroup, id);
            expect($location.url()).toBe('/videos/abc?video=def');
        });
    });
});