describe('Photos', function () {
    var $controller, $scope, $location;

    beforeEach(module('somethingWicked'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
    }));

    describe('PhotosController', function () {
        beforeEach(inject(function (_$q_) {
            $scope.deferred = _$q_.defer();
        }));


        beforeEach(function () {
            $controller('PhotosController', { $scope: $scope, $location: $location });
        });

        it('Photos should get the correct data', function () {
            $scope.deferred.resolve({
                photos: [{
                    id: '062417',
                    thumbnail: 'Images/Photos/062417/IMG_6256.jpg',
                    title: 'Photo title'
                }]
            });
            $scope.$apply();

            expect($scope.photos[0].id).toBe('062417');
            expect($scope.photos[0].thumbnail).toBe('Images/Photos/062417/IMG_6256.jpg');
            expect($scope.photos[0].title).toBe('Photo title');
        });


        describe('showPhotos function', function () {
            it('Sets the url to the photo that was clicked', function () {
                $scope.showPhotos('062417');
                expect($location.url()).toBe('/photos/062417');
            });
        });
    });







    describe('SliderController', function () {
        var $httpBackend, response, respond, $routeParams;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        beforeEach(function () {
            $routeParams = {};
            $controller('SliderController', { $scope: $scope, $location: $location, $routeParams: $routeParams });

            $scope.contentWindow = {
                show: false,
                title: '',
                load: false,
                itemIndex: 0
            };

            response = {
                list: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
                path: '/Images/Photos/',
                title: 'My Photos'
            }

            respond = $httpBackend.whenGET('SomethingWicked.asmx/GetPhotos').respond(response);
            $routeParams.id = '062417';
            $httpBackend.flush();
        });

        it('Content window is shown', function () {
            
            expect($scope.contentWindow.show).toBeTruthy();
        });

        
    });






});