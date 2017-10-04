
App.factory('UserService',
  function($http, api){

    function getPath(path){
      return api + path;
    }

    function getAuth(){
      return "BASIC " + sessionStorage.token;
    }
    function handlerHeader(){
      $http.defaults.headers.common.Authorization = getAuth();
    }


    return {

          salvar: function(dados){
              handlerHeader();
              return $http.post(getPath('users'), dados);

          },
          alterar: function(dados){

              handlerHeader();
              return $http.put(getPath('users'), dados);

          },
          listarAtivos: function(){

              handlerHeader();
              return $http.get(getPath('users/filtro?ativo=1'));

          },
          filtrar: function(dados){

              handlerHeader();
              return $http.get(getPath('users/filtro'+dados));

          },
          listarPerfis: function(){

              handlerHeader();
              return $http.get(getPath('users/perfis'));

          },
          getAuth :   function(){
              return "BASIC " + sessionStorage.token;
            }

    };



});
