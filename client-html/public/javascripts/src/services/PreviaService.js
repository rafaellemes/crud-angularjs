
App.factory('PreviaService', ['$http', 'api', 'UserService',
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
            return $http.post(getPath('previas'), dados);

        },
        listarPacientes: function(id_clinica){
            handlerHeader();
             return $http.get(getPath('previa/clinica/pacientes/'+id_clinica));
        },
       listarConvenios: function(id_clinica){
            handlerHeader();
             return $http.get(getPath('previa/clinica/convenios/'+id_clinica));
        },
      
      listarTipos: function(){
            handlerHeader();
             return $http.get(getPath('previa/tipos'));
        },  
      listarStatus: function(){
            handlerHeader();
             return $http.get(getPath('previa/status'));
        },
       filtrar: function(dados){

            handlerHeader();
            return $http.get(getPath('previa/filtro'+dados));

        },
  };


}]);
