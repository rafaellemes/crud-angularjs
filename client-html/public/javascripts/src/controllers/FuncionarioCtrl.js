App.controller('FuncionarioCtrl', ['$scope', '$base64',
                'FuncionarioService','Util','$window',
    function($scope, $base64, FuncionarioService, Util, $window){


$scope.formulario = {dados:{id_tipo_pessoa:1, ativo:1}};

limparForm();
$scope.listaFuncionarios = [];


listarAtivos();




$scope.novoFuncionario = function(){

  sessionStorage.funcionario = undefined;
  $window.location.href = '#/admin/funcionarios/novo';
}
$scope.alterarFuncionario = function(funcionario){


  sessionStorage.funcionario =  $base64.encode(JSON.stringify(funcionario));
  $window.location.href = '#/admin/funcionarios/alterar';
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
   FuncionarioService.filtrar(filtro).success(function(funcionarios){

        $scope.listaFuncionarios = funcionarios;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaFuncionarios = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarFuncionario(form);
    }else{
      console.log("salvar");
      salvarFuncionario(form);
    }


}

$scope.alterar = function(funcionario){

    //delete funcionario.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(funcionario);
    console.log(Util.copyJson(funcionario));
}


$scope.deletar = function(funcionario){


    deletarFuncionario(funcionario);

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

  FuncionarioService.listarAtivos().success(function(dados){

      var funcionarios = JSON.stringify(dados);

      $scope.listaFuncionarios = dados;

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));

  });


}

function limparForm(){

  alterar = false;
  $scope.formulario = {dados:{id_tipo_pessoa:1, ativo:1}};
}

function salvarFuncionario(dados){

  FuncionarioService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarFuncionario(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  FuncionarioService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarFuncionario(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  FuncionarioService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
