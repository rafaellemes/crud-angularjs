
App.factory('FuncionarioService', ['$http', 'api', 'UserService',
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
            return $http.post(getPath('pessoa'), dados);

        },
        alterar: function(dados){

            handlerHeader();
            return $http.put(getPath('pessoa'), dados);

        },
        listarAtivos: function(){

            handlerHeader();
            return $http.get(getPath('pessoa/filtro?ativo=1&id_tipo_pessoa=1'));

        },
        filtrar: function(dados){

            handlerHeader();
            return $http.get(getPath('pessoa/filtro'+dados));

        }

  };


}]);
