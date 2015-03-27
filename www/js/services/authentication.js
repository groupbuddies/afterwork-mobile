(function() {
  'use strict';

  angular
    .module('starter.services')
    .service('Authentication', Authentication);

  function Authentication($window, $cordovaDevice, $cordovaInAppBrowser, CurrentUser, HOST) {
    return {
      open: open
    };


    function open() {
      if ($window.device)
        openForCordova();
      else
        openForWeb();
    }

    function openForWeb() {
      $window.addEventListener('message', function(e) {
        if (e.origin === 'http://localhost:3000')
          CurrentUser.accessToken(e.data);
      }, false);

      $window.open(
        HOST + '/users/auth/twitter?type=cordova',
        '_blank',
        'height=400, width=550, status=yes, toolbar=no, menubar=no, location=no,addressbar=no'
      );
    }

    function openForCordova() {
      var childWindow = $window.open(
        HOST + '/users/auth/twitter?type=cordova',
        '_blank',
        'location=yes'
      );

      var loop;

      childWindow.addEventListener('loadstart', function() {
        clearInterval(loop);
      });

      childWindow.addEventListener('loadstop', function() {
        loop = setInterval(function() {
          childWindow.executeScript({
            code: 'localStorage.getItem("accessToken")'
          }, callback);

          function callback(token) {
            if (token[0]) {
              CurrentUser.accessToken(token[0]);
              clearInterval(loop);
              childWindow.close();
            }
          }
        }, 500);
      });
    }
  }
})();
