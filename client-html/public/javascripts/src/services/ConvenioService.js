
App.factory('ConvenioService', ['$http', 'api', 'UserService',
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
            return $http.post(getPath('convenio'), dados);

        },
        alterar: function(dados){

            handlerHeader();
            return $http.put(getPath('convenio'), dados);

        },
        listarAtivos: function(){

            handlerHeader();
            return $http.get(getPath('convenio/filtro?ativo=1'));

        },
        filtrar: function(dados){

            handlerHeader();
            return $http.get(getPath('convenio/filtro'+dados));

        },
        listarTabelas: function(id){

            handlerHeader();
            return $http.get(getPath('convenio/tabelas/'+id));

        },
        inativarConvenioTabela: function(dados){

            handlerHeader();
            return $http.put(getPath('convenio/tabelas/inativar/'), dados);

        },
        cadastrarConvenioTabela: function(dados){

            handlerHeader();
            return $http.post(getPath('convenio/tabelas'), dados);

        },
        alterarConvenioTabela: function(dados){

            handlerHeader();
            return $http.put(getPath('convenio/tabelas'), dados);

        },
        listarTabelasConvenio: function(id){

            handlerHeader();
            return $http.get(getPath('convenio/tabelas/nao/'+id));

        },//PLANOS
        listarPlanos: function(id){

            handlerHeader();
            return $http.get(getPath('convenio/planos/'+id));

        },
        inativarConvenioPlano: function(dados){

            handlerHeader();
            return $http.put(getPath('convenio/planos/inativar/'), dados);

        },
        cadastrarConvenioPlano: function(dados){

            handlerHeader();
            return $http.post(getPath('convenio/planos'), dados);

        },
        alterarConvenioPlano: function(dados){

            handlerHeader();
            return $http.put(getPath('convenio/planos'), dados);

        }, //PACIENTES
        listarConveniosPaciente: function(id){

            handlerHeader();
            return $http.get(getPath('convenio/paciente/'+id));

        },
       listarPacientes: function(id){

            handlerHeader();
            return $http.get(getPath('convenio/pacientes/'+id));

        },
        inativarConvenioPaciente: function(dados){

            handlerHeader();
            return $http.put(getPath('convenio/pacientes/inativar/'), dados);

        },
        cadastrarConvenioPaciente: function(dados){

            handlerHeader();
            return $http.post(getPath('convenio/pacientes'), dados);

        },
        alterarConvenioPaciente: function(dados){

            handlerHeader();
            return $http.put(getPath('convenio/pacientes'), dados);

        }

  };


}]);
