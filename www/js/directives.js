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

.directive('awCreateEventButton', function() {
  return {
    scope: {
      create: '&'
    },
    templateUrl: "templates/partials/create-event-button.html",
    link : function(scope, element, attrs) {
      scope.labelButton = attrs['labelButton'];
      scope.icon = attrs['icon'];
    }
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
