(function() {
  angular.module('starter.services', ['starter.constants'])
    .factory('Events', function ($http, CurrentUser, HOST) {

      'use strict';
      var events = [];

      function attendee (eventId, userId) {
        var i;
        var attendees = findEvent(events, eventId).attendees;
        for (i=0; i<attendees.length; i++) {
          if ( attendees[i].user_id === userId ) {
            return true;
          }
        }
        return false;
      }

      function findEvent (events, eventId) {
        var i;
        for(i=0; i<events.length; i++) {
          if ( events[i].id === eventId ) {
            return events[i];
          }
        }
      }

      function fetch () {
        var getEvents = {
          method: 'GET',
          url: HOST + '/api/events',
          headers: { 'Authorization' : 'Token token=Trrk2sF0aBBUL9B05lBurQ' }
        };

        return $http(getEvents)
          .success(function (data) {
            events = data;
          });
      }

      return {
        fetch: fetch,
        all: function () {
          return events;
        },
        remove: function (event) {
          events.splice(events.indexOf(event), 1);
        },
        get: function (eventId) {
          var i;
          for (i = 0; i < events.length; i++) {
            if (events[i].id === parseInt(eventId)) {
              return events[i];
            }
          }
          return null;
        },
        attend: function (eventId) {
          return $http({
            method: 'POST',
            url: HOST + '/api/events/' + eventId + '/attend',
            headers: { 'Authorization' : 'Token token=Trrk2sF0aBBUL9B05lBurQ'}
          })
            .success(function () {
              return fetch();
            });
        },
        cancelAttend: function (eventId) {
          return $http({
            method: 'DELETE',
            url: HOST + '/api/events/' + eventId + '/cancel_attend',
            headers: { 'Authorization' : 'Token token=Trrk2sF0aBBUL9B05lBurQ'}
          })
            .success(function () {
              return fetch();
            });
        },
        isAttending: function (eventId) {
          var user = CurrentUser.user();
          if (user)
            return attendee(eventId, user.id);
          else
            return false;
        }
      };
    });
})();
