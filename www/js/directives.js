angular.module('starter.directives', [])

.directive('awEventForm', function (){
  return {
    templateUrl: 'templates/partials/event-form.html'
  }
})

.directive('awAddAvailability', function (){
  return {
    templateUrl: 'templates/partials/add-availability.html'
  }
})

.directive('awRemoveAvailability', function (){
  return {
    templateUrl: 'templates/partials/remove-availability.html'
  }
})

.directive('awAttending', function () {
  return {
    templateUrl: 'templates/partials/user-attending.html'
  }
})

.directive('awButton', function() {
  return {
    scope: {
      function: '&',
      labelButton : '@',
      icon: '@',
      myClass: '@'
    },
    templateUrl: "templates/partials/button.html"
  }
})

.directive('awAvailabilityForm', function() {
  return {
    templateUrl: 'templates/partials/availability-form.html'
  }
})

.directive('awEventDetail', function() {
  return {
    templateUrl: 'templates/partials/event-detail-info.html'
  }
})

.directive('awAvailabilityDetail', function() {
  return {
    templateUrl: 'templates/partials/availability-detail.html'
  }
})
