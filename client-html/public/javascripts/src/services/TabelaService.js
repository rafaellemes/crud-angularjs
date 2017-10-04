
App.factory('TabelaService', ['$http', 'api', 'UserService',
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
            return $http.post(getPath('tabela'), dados);

        },
        alterar: function(dados){

            handlerHeader();
            return $http.put(getPath('tabela'), dados);

        },
        listarAtivos: function(){

            handlerHeader();
            return $http.get(getPath('tabela/filtro?ativo=1'));

        },
        filtrar: function(dados){

            handlerHeader();
            return $http.get(getPath('tabela/filtro'+dados));

        }

  };


}]);
