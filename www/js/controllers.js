(function() {
  'use strict';

  angular.module('starter.controllers', [])

    .controller('EventsCtrl', function ($scope, Events, events, $state, CurrentUser) {
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

      $scope.isOwner = function(event) {
        return event.owner === CurrentUser.user().id
      }

      $scope.createEvent = function () {
        $state.go('tab.event-new');
      };

      $scope.remove = function (event) {
        Events.remove(event);
      };

      $scope.currentUser = CurrentUser.user;

    })

    .controller('EventDetailCtrl', function ($scope, $stateParams, Events, CurrentUser) {
      $scope.event = function () {
        return Events.get($stateParams.eventId);
      };

      $scope.attend = Events.attend;
      $scope.cancelAttend = Events.cancelAttend;
      $scope.isAttending = Events.isAttending;
      $scope.currentUser = CurrentUser.user;

    })

    .controller('EventNewCtrl', function ($scope, Events) {
      $scope.createEvent = function (event) {
        Events.create(event);
      };

      $scope.eventValid = function(form) {
        if ( form.name.$invalid || form.location.$invalid || form.date.$invalid ) {
          return true;
        }
        else{
          return false;
        }
      };

      $scope.validAndPristine = function(form, field) {
        if ( form[field].$invalid && form[field].$dirty ){
          return true;
        }
        else {
          return false;
        }
      };

      $scope.validOrPristine = function(form, field) {
        if ( form[field].$invalid || form[field].$dirty ){
          return true;
        }
        else {
          return false;
        }
      };
    })

    .controller('SettingsCtrl', function($scope, Authentication, CurrentUser, $state) {
      $scope.signInWithTwitter = Authentication.open;

      $scope.currentUser = CurrentUser.user;

      $scope.signOut = function () {
        localStorage.removeItem('ls.accessToken');
        $state.go('tab.events');
      };
    })

    .controller('AvailabilityCtrl', function(Availabilities) {
      this.availabilities = Availabilities.all();
      this.dayNames = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
        ];

      this.days = [1,2,3,4,5,6,7];

      this.remove = function (availability) {
        Availabilities.remove(availability);
      };

      this.hasAvailability = function(day){
        return Availabilities.hasAvailability(day);
      };
    })

    .controller('AvailabilityNewCtrl', function($scope, Availabilities, $stateParams){

      $scope.createAvailability = function(availability) {
        Availabilities.create(availability, $stateParams.weekDay);
      };
    });

})();
