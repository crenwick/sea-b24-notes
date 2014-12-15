'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('UsersController', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var usersController = $controllerConstructor('UsersCtrl', {$scope: $scope});
    expect(typeof usersController).toBe('object');
  });

  describe('rest request with users', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('UsersCtrl', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a new user', function() {
      $httpBackend.expectPOST('/api/users').respond(200, {'jwt': '1'});
      $scope.newUser = {'email': 'user@example.com', 'password': 'password123', 'passwordConfirmation': 'password123'};
      $scope.signUp();

      $httpBackend.flush();

      expect($cookies.jwt).toBeDefined();
      expect($cookies.jwt).toBe(1);
    });
  });
});
