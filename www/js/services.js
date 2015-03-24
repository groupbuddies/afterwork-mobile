angular.module('starter.services', [])

.factory('Events', function($http, $rootScope){

  var events = [];

  $http({method: 'GET', url: 'http://localhost:3000/api/events', headers: { 'Authorization' : 'Token token=Trrk2sF0aBBUL9B05lBurQ'}})
    .success(function(data){
      events = data;
    });


  return {
    all: function(){
        return events;
    },
    remove: function(event) {
      events.splice(events.indexOf(event), 1);
    },
    get: function(eventId){
      for(var i = 0; i < events.length; i++){
        if(events[i].id === parseInt(eventId)){
          return events[i];
        }
      }
      return null;
    }
  };
});
