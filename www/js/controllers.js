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
