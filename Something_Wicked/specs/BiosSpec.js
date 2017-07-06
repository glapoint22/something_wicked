describe('Bios', function () {
    var $controller, $scope, $location;

    beforeEach(module('somethingWicked'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
    }));

    describe('MembersController', function () {
        beforeEach(inject(function (_$q_) {
            $scope.deferred = _$q_.defer();
        }));


        beforeEach(function () {
            $controller('MembersController', { $scope: $scope, $location: $location });
        });

        it('Members should get the correct data', function () {
            $scope.deferred.resolve({
                members: [{
                    id: 1,
                    thumbnail: 'Images/Member_Thumbnails/member.png',
                    title: 'member'
                }]
            });
            $scope.$apply();

            expect($scope.members[0].id).toBe(1);
            expect($scope.members[0].thumbnail).toBe('Images/Member_Thumbnails/member.png');
            expect($scope.members[0].title).toBe('member');
        });


        describe('showBio function', function () {
            it('Sets the url to the member that was clicked', function () {
                $scope.showBio('member');
                expect($location.url()).toBe('/bios/member');
            });
        });
    });

    describe('BiosController', function () {
        var $httpBackend, response, $sce, respond;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        beforeEach(inject(function (_$controller_, _$rootScope_, _$sce_, _$location_) {
            $sce = _$sce_;
            $controller('BiosController', { $scope: $scope, $sce: $sce, $location: $location });
        }));

        beforeEach(function () {
            $scope.contentWindow = {
                show: false,
                title: '',
                load: false,
                itemIndex: 0
            };

            response = {
                bio: 'Member bio',
                name: 'Member Name',
                thumbnail: 'Images/Member_Thumbnails/Member.png'
            }

            respond  = $httpBackend.whenGET('SomethingWicked.asmx/GetBio').respond(response);
        });

        it('Content window gets the correct data', function () {
            $httpBackend.flush();
            expect($scope.thumbnail).toBe('Images/Member_Thumbnails/Member.png');
            expect($scope.contentWindow.title).toBe('Member Name');
            expect($scope.bio.toString()).toEqual($sce.trustAsHtml('Member bio').toString());
        });

        it('Content window is shown', function () {
            $httpBackend.flush();
            expect($scope.contentWindow.show).toBeTruthy();
        });

        it('If bio is null, page will redirect to the root', function () {
            $location.path('/bios/member');
            response.bio = null;
            $httpBackend.flush();
            expect($location.url()).toBe('/');
        });


        it('If http request fails, page will redirect to the root', function () {
            $location.path('/bios/member');
            respond.respond(500, '');
            $httpBackend.flush();
            expect($location.url()).toBe('/');
        });
    });
});