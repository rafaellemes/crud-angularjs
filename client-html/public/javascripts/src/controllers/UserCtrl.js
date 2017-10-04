App.controller('UserCtrl', ['$scope', '$base64',
                'UserService','Util','$window',
    function($scope, $base64, UserService,  Util, $window){


$scope.formulario = {dados:{ativo:1}};

limparForm();
$scope.listaUsers = [];
$scope.listaPerfis = [];

listarAtivos();





$scope.novoUser = function(){

  sessionStorage.user = undefined;
  $window.location.href = '#/admin/usuarios/novo';
}
$scope.alterarUser = function(user){


  sessionStorage.user =  $base64.encode(JSON.stringify(user));
  $window.location.href = '#/admin/usuarios/alterar';
}

$scope.limparForm = limparForm;

$scope.setStatus = function(ativo){
  if(ativo){
    $scope.formulario.dados.ativo = 1;
  }else{
    $scope.formulario.dados.ativo = 0;
  }
  console.log($scope.formulario);
}


$scope.pesquisar = function(){

   alterar = false;
   console.log($scope.formulario.dados);
   filtro = getQueryParameters($scope.formulario.dados);
   //console.log(filtro);
   UserService.filtrar(filtro).success(function(users){

        $scope.listaUsers = users;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaUsers = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarUser(form);
    }else{
      console.log("salvar");
      salvarUser(form);
    }


}

$scope.alterar = function(user){

    //delete user.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(user);
    console.log(Util.copyJson(user));
}


$scope.deletar = function(user){


    deletarUser(user);

}

$scope.getNomePerfil = function(id_perfil){

  var nConvenio = "";
angular.forEach($scope.listaPerfis, function(v, k){

     if(v.id === id_perfil){
      nConvenio = v.nome;
      return;
     }
});

  return nConvenio;

}

function getQueryParameters(filtro){

  var strFiltro = "?";
  angular.forEach(filtro, function(v, k){

    if(v !== ''){
      strFiltro += k + "=" + v + "&";
    }
  });

   return strFiltro;

}

function listarAtivos(){

  UserService.listarAtivos().success(function(dados){

      var users = JSON.stringify(dados);

      $scope.listaUsers = dados;
    //  console.log(dados);
      listarPerfis();

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));
    listarPerfis();
  });


}

function listarPerfis(){

  UserService.listarPerfis().success(function(dados){

      var users = JSON.stringify(dados);

      $scope.listaPerfis = dados;

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));

  });


}

function limparForm(){

  alterar = false;
  $scope.formulario = {dados:{ativo:1}};
}

function salvarUser(dados){

  UserService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarUser(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  UserService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarUser(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  UserService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
