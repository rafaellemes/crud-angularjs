
App.factory('PlanoService', ['$http', 'api', 'UserService',
function($http, api, UserService){

  function getPath(path){
    return api + path;
  }

  function handlerHeader(){
    $http.defaults.headers.common.Authorization = UserService.getAuth();
  }

  return {

        salvar: function(dados){
            handlerHeader();
            return $http.post(getPath('plano'), dados);

        },
        alterar: function(dados){

            handlerHeader();
            return $http.put(getPath('plano'), dados);

        },
        listarAtivos: function(){

            handlerHeader();
            return $http.get(getPath('plano/filtro?ativo=1'));

        },
        filtrar: function(dados){

            handlerHeader();
            return $http.get(getPath('plano/filtro'+dados));

        },
      findById: function(id){

            handlerHeader();
            return $http.get(getPath('plano/id/'+id));

        }

  };


}]);
