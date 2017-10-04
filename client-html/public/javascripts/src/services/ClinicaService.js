
App.factory('ClinicaService', ['$http', 'api', 'UserService',
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
            return $http.post(getPath('clinica'), dados);

        },
        alterar: function(dados){

            handlerHeader();
            return $http.put(getPath('clinica'), dados);

        },
        listarAtivos: function(){

            handlerHeader();
            return $http.get(getPath('clinica/filtro?ativo=1'));

        },
        filtrar: function(dados){

            handlerHeader();
            return $http.get(getPath('clinica/filtro'+dados));

        },
        listarTabelas: function(id){

            handlerHeader();
            return $http.get(getPath('clinica/tabelas/'+id));

        },
        inativarClinicaTabela: function(dados){

            handlerHeader();
            return $http.put(getPath('clinica/tabelas/inativar/'), dados);

        },
        cadastrarClinicaTabela: function(dados){

            handlerHeader();
            return $http.post(getPath('clinica/tabelas'), dados);

        },
        listarTabelasClinica: function(id){

            handlerHeader();
            return $http.get(getPath('clinica/tabelas/nao/'+id));

        },//Clinicas
       listarConvenioClinicas: function(id){

            handlerHeader();
            return $http.get(getPath('clinica/convenios/'+id));

        },
       listarClinicasPorConvenio: function(id){

            handlerHeader();
            return $http.get(getPath('clinica/convenio/'+id));

        },
        inativarConvenioClinica: function(dados){

            handlerHeader();
            return $http.put(getPath('clinica/convenios/inativar/'), dados);

        },
        cadastrarConvenioClinica: function(dados){

            handlerHeader();
            return $http.post(getPath('clinica/convenios'), dados);

        },
        alterarConvenioClinica: function(dados){

            handlerHeader();
            return $http.put(getPath('clinica/convenios'), dados);

        },

  };


}]);
