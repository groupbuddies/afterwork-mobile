angular.module('starter.controllers', [])

.controller('EventsCtrl', function($scope, $http, Events) {
  $scope.events = Events.all;
  $scope.remove = function(event) {
    Events.remove(event);
  };
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.event = Events.get($stateParams.eventId);
})

