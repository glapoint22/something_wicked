describe('Photos', function () {
    var $controller, $scope, $location;

    beforeEach(module('somethingWicked'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
    }));

    //PhotosController
    describe('PhotosController', function () {
        beforeEach(inject(function (_$q_) {
            $scope.deferred = _$q_.defer();
        }));


        beforeEach(function () {
            $controller('PhotosController', { $scope: $scope, $location: $location });
        });


        it('Sets the photos', function () {
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
            it('Sets the url to the photo container that was clicked, e.g. /photos/062417', function () {
                $scope.showPhotos('062417');
                expect($location.url()).toBe('/photos/062417');
            });
        });
    });




    //SliderController
    describe('SliderController', function () {
        var $httpBackend, response, authRequestHandler, $routeParams = {};

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
            $routeParams = {};
        });


        beforeEach(function () {
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

            authRequestHandler = $httpBackend.whenGET('SomethingWicked.asmx/GetPhotos').respond(response);
            $routeParams.id = '062417';
            $location.path('/photos/062417/');
        });



        //Specs
        it('Should redirect to root if the image list is empty', function () {
            response.list = [];
            $httpBackend.flush();
            expect($location.url()).toEqual('/');
        });

        it('Sets the photo properties', function () {
            $httpBackend.flush();
            expect($scope.list).toEqual([
                'img1.jpg',
                'img2.jpg',
                'img3.jpg'
            ]);
            expect($scope.photos).toEqual([
                '/Images/Photos/062417/img1.jpg',
                '/Images/Photos/062417/img2.jpg',
                '/Images/Photos/062417/img3.jpg'
            ]);
        });



        it('Sets the content window title to the photo container\'s title', function () {
            $httpBackend.flush();
            expect($scope.contentWindow.title).toBe('My Photos');
        });


        it('Shows the content window', function () {
            $httpBackend.flush();
            expect($scope.contentWindow.show).toBeTruthy();
        });

        it('Should display the first image when an image is NOT specified in the query string', function () {
            $httpBackend.flush();
            expect($location.url()).toEqual('/photos/062417?img=img1');
            expect($scope.contentWindow.itemIndex).toEqual(0);
        });

        it('Should display the image that is specified in the query string', function () {
            $location.search('img', 'img2');
            $httpBackend.flush();
            expect($location.url()).toEqual('/photos/062417?img=img2');
            expect($scope.contentWindow.itemIndex).toEqual(1);
        });

        it('Should redirect to root if the image specified in the query string is invalid', function () {
            $location.search('img', 'img5');
            $httpBackend.flush();
            expect($location.url()).toEqual('/');
            expect($scope.contentWindow.itemIndex).toEqual(-1);
        });

        it('Should redirect to root if the http request failed', function () {
            authRequestHandler.respond(500, '');
            $httpBackend.flush();
            expect($location.url()).toEqual('/');
        });

        describe('moveSlider function', function () {
            it('Should go to the next image in the list when going forward', function () {
                $httpBackend.flush();
                $scope.moveSlider(-1);
                expect($location.url()).toEqual('/photos/062417?img=img2');
                expect($scope.contentWindow.itemIndex).toEqual(1);
            });
            it('Should go to the previous image in the list when going backward', function () {
                $httpBackend.flush();
                $scope.moveSlider(-1);
                $scope.moveSlider(1);
                expect($location.url()).toEqual('/photos/062417?img=img1');
                expect($scope.contentWindow.itemIndex).toEqual(0);
            });
            it('Should NOT go any further than the first image when going backward', function () {
                $httpBackend.flush();
                $scope.moveSlider(1);
                expect($location.url()).toEqual('/photos/062417?img=img1');
                expect($scope.contentWindow.itemIndex).toEqual(0);
            });
            it('Should NOT go any further than the last image when going forward', function () {
                $httpBackend.flush();
                $scope.moveSlider(-1);
                $scope.moveSlider(-1);
                $scope.moveSlider(-1);
                expect($location.url()).toEqual('/photos/062417?img=img3');
                expect($scope.contentWindow.itemIndex).toEqual(2);
            });
        });
    });
});