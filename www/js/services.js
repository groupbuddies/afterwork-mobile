(function() {
  angular.module('starter.services', ['starter.constants'])
    .factory('Events', function ($http, CurrentUser, HOST, $state) {
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
        var token = CurrentUser.accessToken();
        var getEvents = {
          method: 'GET',
          url: HOST + '/api/events',
          headers: { 'Authorization' : 'Token token='+ token }
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
          var token = CurrentUser.accessToken();
          events.splice(events.indexOf(event), 1);

          return $http({
            method: 'DELETE',
            url: HOST + '/api/events/' +event.id,
            headers: { 'Authorization' : 'Token token='+token }
          });
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
        create: function (event) {
          var token = CurrentUser.accessToken();

          return $http({
            method: 'POST',
            url: HOST + '/api/events/',
            params: {
              name: event.name,
              location: event.location,
              start_date: event.date,
              description: event.description,
              hashtag: event.hashtag,
              interest_list: event.interest_list
            },
            headers: { 'Authorization' : 'Token token=' + token }
          })
          .success(function (event) {
            events.push(event);
            console.log('successfully created!');
            $state.go('tab.events');
          })
          .error(function (){
            console.log('Error');
          });
        },
        attend: function (eventId) {
          var token = CurrentUser.accessToken();
          return $http({
            method: 'POST',
            url: HOST + '/api/events/' + eventId + '/attend',
            headers: { 'Authorization' : 'Token token='+ token }
          })
            .success(function () {
              return fetch();
            });
        },
        cancelAttend: function (eventId) {
          var token = CurrentUser.accessToken();
          return $http({
            method: 'DELETE',
            url: HOST + '/api/events/' + eventId + '/cancel_attend',
            headers: { 'Authorization' : 'Token token='+ token }
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
        },
        onRefresh: function () {
          var token = CurrentUser.accessToken();
          var getEvents = {
            method: 'GET',
            url: HOST + '/api/events',
            headers: { 'Authorization' : 'Token token='+ token }
          };

          return $http(getEvents);
        }
      };
    })

    .factory('Availabilities', function ($http, CurrentUser, HOST, $state) {
      'use strict';
      var availabilities = [];

      function fetch () {
        var token = CurrentUser.accessToken();
        var getAvailabilities = {
          method: 'GET',
          url: HOST + '/api/availabilities',
          headers: { 'Authorization' : 'Token token='+ token }
        };

        return $http(getAvailabilities)
          .success(function (data) {
            availabilities = data;
          });
      }

      return {
        fetch: fetch,
        all: function () {
          return availabilities;
        },
        remove: function (availability) {
          var token = CurrentUser.accessToken();
          availabilities.splice(availabilities.indexOf(availability), 1);
          return $http({
            method: 'DELETE',
            url: HOST + '/api/availabilities/' +availability.id,
            headers: { 'Authorization' : 'Token token='+token }
          });
        },
        create: function (availability) {
          var token = CurrentUser.accessToken();
          return $http({
            method: 'POST',
            url: HOST + '/api/availabilities/',
            params: {
              week_day: availability.weekDay,
              start_time: availability.startTime,
              end_time: availability.endTime,
            },
            headers: { 'Authorization' : 'Token token=' + token }
          })
          .success(function (availability) {
            availabilities.push(availability);
            console.log('availability successfully created!');
            $state.go('tab.settings');
          })
          .error(function (){
            console.log('Error');
          });
        },
        hasAvailability: function(day) {
          var i;
          for(i=0; i<availabilities.length; i++){
            if (availabilities[i].week_day === day) {
              return true;
            }
          }
          return false;
        }
      };
    });
})();
