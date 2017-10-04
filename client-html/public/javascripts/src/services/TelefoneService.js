
App.factory('TelefoneService', ['$http', 'api', 'UserService',
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
            return $http.post(getPath('telefone'), dados);

        },
        alterar: function(dados){

            handlerHeader();
            return $http.put(getPath('telefone'), dados);

        },
        deletar: function(dados){

            handlerHeader();
            return $http.delete(getPath('telefone'), dados);

        },
        consultarTelefonePessoa: function(id_pessoa){

            handlerHeader();
            return $http.get(getPath('telefone/pessoa/'+ id_pessoa));

        },
        consultarTelefoneClinica: function(id_clicina){

            handlerHeader();
            return $http.get(getPath('telefone/clinica/'+ id_clicina));

        },
        consultarTelefoneConvenio: function(id_convenio){

            handlerHeader();
            return $http.get(getPath('telefone/convenio/'+ id_convenio));

        },
        cadastrarTelefonePessoa : function(dados){
          handlerHeader();
          return $http.post(getPath('telefone/pessoa'), dados);
        },
        cadastrarTelefoneClinica : function(dados){
          handlerHeader();
          return $http.post(getPath('telefone/clinica'), dados);
        },
        cadastrarTelefoneConvenio : function(dados){
          handlerHeader();
          return $http.post(getPath('telefone/convenio'), dados);
        },
        deletarTelefonePessoa : function(dados){

          var params = "?tel="+dados.dados.id+"&tp="+dados.dados.id_telefone_pessoa;
          handlerHeader();
          return $http.delete(getPath('telefone/pessoa'+params), dados);
        },
        deletarTelefoneClinica : function(dados){
          handlerHeader();
          return $http.delete(getPath('telefone/clinica'), dados);
        },
        deletarTelefoneConvenio : function(dados){
          handlerHeader();
          return $http.delete(getPath('telefone/convenio'), dados);
        },
        findById : function(id){
          handlerHeader();
          return $http.get(getPath('telefone/id/'+ id));
        },
        filtrar: function(dados){

            handlerHeader();
            return $http.get(getPath('pessoa/filtro'+dados));

        }

  };


}]);
