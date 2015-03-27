(function() {
  'use strict';

  angular.module('starter.controllers', [])

    .controller('EventsCtrl', function ($scope, Events, events) {
      $scope.events = events;
      $scope.remove = function (event) {
        Events.remove(event);
      };
    })

    .controller('EventDetailCtrl', function ($scope, $stateParams, Events) {
      $scope.event = function () { return Events.get($stateParams.eventId); };
      $scope.attend = Events.attend;
      $scope.cancelAttend = Events.cancelAttend;
      $scope.isAttending = Events.isAttending;
    })

    .controller('SettingsCtrl', function($scope, Authentication, CurrentUser, HOST) {
      $scope.signInWithTwitter = Authentication.open;

      $scope.currentUser = CurrentUser.user;
    });
})();
