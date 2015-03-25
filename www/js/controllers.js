angular.module('starter.controllers', [])

  .controller('EventsCtrl', function ($scope, Events, events) {
    'use strict';
    $scope.events = events;
    $scope.remove = function (event) {
      Events.remove(event);
    };
  })

  .controller('EventDetailCtrl', function ($scope, $stateParams, Events, events) {
    'use strict';
    $scope.event = function () { return Events.get($stateParams.eventId); };
    $scope.attend = Events.attend;
    $scope.cancelAttend = Events.cancelAttend;
    $scope.isAttending = Events.isAttending;
  });

  .controller('SignInCtrl', function($scope, $window, localStorageService, $rootScope) {
    $scope.signInWithTwitter = function() {
      $window.addEventListener('message', function(e) {
        if (e.origin === "http://localhost:3000") {
          localStorageService.set('accessToken', e.data);
          $rootScope.$emit('access_token');
        }
      }, false);

      $window.open(
        "http://localhost:3000/users/auth/twitter?type=cordova",
        "_blank",
        "height=400, width=550, status=yes, toolbar=no, menubar=no, location=no,addressbar=no"
      );
    };
  });
