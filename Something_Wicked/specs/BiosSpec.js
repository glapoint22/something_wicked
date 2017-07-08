describe('Bios', function () {
    var $controller, $scope, $location;

    beforeEach(module('somethingWicked'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
    }));

    //MembersController
    describe('MembersController', function () {
        beforeEach(inject(function (_$q_) {
            $scope.deferred = _$q_.defer();
        }));


        beforeEach(function () {
            $controller('MembersController', { $scope: $scope, $location: $location });
        });

        it('Sets the members', function () {
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
            it('Sets the url to the member that was clicked, e.g. /bios/amy', function () {
                $scope.showBio('member');
                expect($location.url()).toBe('/bios/member');
            });
        });
    });

    //BiosController
    describe('BiosController', function () {
        var $httpBackend, response, $sce, authRequestHandler;

        beforeEach(inject(function (_$httpBackend_, _$sce_) {
            $httpBackend = _$httpBackend_;
            $sce = _$sce_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        beforeEach(function () {
            $controller('BiosController', { $scope: $scope, $sce: $sce, $location: $location });
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

            authRequestHandler = $httpBackend.whenGET('SomethingWicked.asmx/GetBio').respond(response);
        });

        //Specs
        it('Should redirect to root if there is no bio data', function () {
            $location.path('/bios/member');
            response.bio = null;
            $httpBackend.flush();
            expect($location.url()).toBe('/');
        });


        it('Sets the bio properties', function () {
            $httpBackend.flush();
            expect($scope.thumbnail).toBe('Images/Member_Thumbnails/Member.png');
            expect($scope.bio.toString()).toEqual($sce.trustAsHtml('Member bio').toString());
        });


        it('Sets the content window title to the member\'s name', function () {
            $httpBackend.flush();
            expect($scope.contentWindow.title).toBe('Member Name');
        });


        it('Shows the content window', function () {
            $httpBackend.flush();
            expect($scope.contentWindow.show).toBeTruthy();
        });


        it('Should redirect to root if the http request failed', function () {
            $location.path('/bios/member');
            authRequestHandler.respond(500, '');
            $httpBackend.flush();
            expect($location.url()).toBe('/');
        });
    });
});