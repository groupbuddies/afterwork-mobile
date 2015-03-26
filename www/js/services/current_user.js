angular
  .module('starter.services')
  .service('CurrentUser', CurrentUser);

function CurrentUser(localStorageService, $rootScope, $http, HOST) {
  var _accessToken,
      _user;

  if (localStorageService.get('accessToken')) {
    setAccessToken(localStorageService.get('accessToken'));
  }

  return {
    accessToken: accessToken,
    user: user
  };

  function accessToken(token) {
    if (token)
      return setAccessToken(token);
    else
      return _accessToken;
  }

  function user() {
    return _user;
  }

  function setAccessToken(token) {
    _accessToken = token;
    localStorageService.set('accessToken', _accessToken);
    $rootScope.$emit('current_user:access_token', _accessToken);
    updateUser();
  }

  function updateUser() {
    var options = {
      method: 'GET',
      url: HOST + '/api/me',
      headers: {
        Authorization: 'Token token=' + _accessToken
      }
    };

    $http(options).success(function(data) {
      _user = data;
      $rootScope.$emit('current_user:user');
    });
  }
}
