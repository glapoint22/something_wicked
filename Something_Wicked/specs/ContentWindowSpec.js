describe('Content Window', function () {
    var $controller, $scope, $location;

    beforeEach(module('somethingWicked'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
        $controller('ContentWindowController', { $scope: $scope, $location: $location });
    }));

    it('contentWindow property is initialized correctly', function () {
        expect($scope.contentWindow.show).toBeFalsy();
        expect($scope.contentWindow.title).toBe('');
        expect($scope.contentWindow.load).toBeFalsy();
        expect($scope.contentWindow.itemIndex).toEqual(0);
    });

    describe('close function', function () {
        beforeEach(function () {
            $scope.close();
        });

        it('The content window should NOT be visible', function () {
            expect($scope.contentWindow.show).toBeFalsy();
        });

        it('The loading mask should NOT be showing', function () {
            expect($scope.contentWindow.load).toBeFalsy();
        });

        it('Url should be at the root', function () {
            expect($location.url()).toBe('/');
        });
    });

    describe('showContentWindow function', function () {
        var isShowing;

        it('If url is at root, content window should NOT be showing', function () {
            isShowing = $scope.showContentWindow();
            expect(isShowing).toBeFalsy();
        });

        it('If url is NOT at root and content window is open, content window should be showing', function () {
            $scope.contentWindow.show = true;
            $location.path('/bios/member');
            isShowing = $scope.showContentWindow();
            expect(isShowing).toBeTruthy();
        });
    });


});