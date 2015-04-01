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
