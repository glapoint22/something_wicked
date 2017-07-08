describe('Content Window', function () {
    describe('ContentWindowController', function () {
        var $controller, $scope, $location;

        beforeEach(module('somethingWicked'));

        beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            $location = _$location_;
            $controller('ContentWindowController', { $scope: $scope, $location: $location });
        }));

        it('initializes the properties', function () {
            expect($scope.contentWindow.show).toBeFalsy();
            expect($scope.contentWindow.title).toBe('');
            expect($scope.contentWindow.load).toBeFalsy();
            expect($scope.contentWindow.itemIndex).toEqual(0);
        });

        describe('close function', function () {
            beforeEach(function () {
                $scope.close();
            });

            it('Hides the content window', function () {
                expect($scope.contentWindow.show).toBeFalsy();
            });

            it('Hides the loading mask', function () {
                expect($scope.contentWindow.load).toBeFalsy();
            });

            it('Sets the url to be at the root', function () {
                expect($location.url()).toBe('/');
            });
        });

        describe('showContentWindow function', function () {
            var isShowing;

            it('Should hide the content window if url as at the root', function () {
                isShowing = $scope.showContentWindow();
                expect(isShowing).toBeFalsy();
            });

            it('Should show the content window if url is not at the root', function () {
                $scope.contentWindow.show = true;
                $location.path('/bios/member');
                isShowing = $scope.showContentWindow();
                expect(isShowing).toBeTruthy();
            });
        });
    });
});