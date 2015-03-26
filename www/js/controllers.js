(function() {
  'use strict';

  angular.module('starter.controllers', [])

    .controller('EventsCtrl', function ($scope, Events, events) {
      $scope.events = events;
      $scope.onRefresh = function() {
        Events.onRefresh()
          .success(function (data) {
            $scope.events = data;
          })
          .finally(function () {
            $scope.$broadcast('scroll.refreshComplete');
          });
      };
      $scope.createEvent = function () { $state.go('tab.event-new'); };
      $scope.remove = function (event) { Events.remove(event); };
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
    })

    .controller('EventNewCtrl', function ($scope, Events) {
      $scope.createEvent = function (event) {
        var newEvent = Events.create(event);
        console.log(newEvent);
      };
    });
})();
