
App.factory('EnderecoService', ['$http', 'api', 'UserService', 'Util',
function($http, api, UserService, Util){

  function getPath(path){
    return api + path;
  }

  function getEndereco(cep){
    return "http://api.postmon.com.br/v1/cep/" + cep;
  }

  function handlerHeader(){
    $http.defaults.headers.common.Authorization = UserService.getAuth();
  }

  function getPostmonCep(cep){

    var endereco = {dados:{}};

    $http.get(getEndereco(cep))
    .success(function(result){

      endereco.dados.cep = result.cep;
      endereco.dados.cidade = result.cidade;
      endereco.dados.estado = result.estado;
      endereco.dados.logradouro = result.logradouro;


    })
    .error(function(data, status, headers, config){
      endereco  = {dados:{}};
    });

    return endereco;
  }

  return {


      consultarCEP: function(cep){

      //  handlerHeader();

        return $http.get(getPath('endereco/cep/'+ cep)).success(function(result){


          if(!Util.isEmpty(result)){
            return result[0];

          }else{
            //return getPostmonCep(cep);
            return null;
            //console.log(endereco);
          }


        })
        .error(function(data, status, headers, config){
           return  null;

        });

      },
      alterarEnderecoPessoa: function(dados){
          handlerHeader();
          return $http.put(getPath('endereco/pessoa'), dados);
      },
      cadastrarEnderecoPessoa: function(dados){
          handlerHeader();
          return $http.post(getPath('endereco/pessoa'), dados);
      },
     deletarEnderecoPessoa: function(id){
        handlerHeader();
          return $http.delete(getPath('endereco/pessoa?id='+id));
      },
      consultarEnderecoPessoa: function(id){
        handlerHeader();
          return $http.get(getPath('endereco/pessoa/'+id));
      }


  };
}]);
