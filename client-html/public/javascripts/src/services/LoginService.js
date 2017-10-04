
App.factory('LoginService', function($http, api){

  function getPath(path){
    return api + path;
  }

  return {

        login: function(dados){

            return $http.post(getPath('users/login/'), dados);

        }

  };


});
