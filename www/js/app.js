(function() {
  angular.module('starter', [
    'ionic',
    'starter.controllers',
    'starter.services',
    'starter.constants',
    'LocalStorageModule',
    'ngCordova'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tab.events', {
        url: '/events',
        views: {
          'tab-events': {
            templateUrl: 'templates/tab-events.html',
            controller: 'EventsCtrl'
          }
        },
        resolve: {
          events: function (Events) {
            return Events.fetch().then(function () {
              return Events.all();
            })
          }
        }
      })
      .state('tab.event-detail',{
        url: '/events/:eventId',
        views: {
          'tab-events': {
            templateUrl: 'templates/event-detail.html',
            controller: 'EventDetailCtrl'
          }
        },
        resolve: {
          events: function (Events) {
            return Events.fetch().then(function () {
              return Events.all();
            })
          }
        }
      })
      .state('tab.settings',{
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/tab-settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })
      .state('tab.event-new', {
        url: '/events/new',
        views: {
          'tab-events': {
            templateUrl: 'templates/event-new.html',
            controller: 'EventNewCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/events');
  });
})();
