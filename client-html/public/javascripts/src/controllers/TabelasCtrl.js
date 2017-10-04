App.controller('TabelasCtrl', ['$scope', '$base64',
                'TabelaService','Util','$window',
    function($scope, $base64, TabelaService, Util, $window){


$scope.formulario = {dados:{ativo:1}};

limparForm();
$scope.listaTabelas = [];


listarAtivos();




$scope.novoTabela = function(){

  sessionStorage.tabela = undefined;
  $window.location.href = '#/admin/tabelas/novo';
}
$scope.alterarTabela = function(tabela){


  sessionStorage.tabela =  $base64.encode(JSON.stringify(tabela));
  $window.location.href = '#/admin/tabelas/alterar';
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
   TabelaService.filtrar(filtro).success(function(tabelas){

        $scope.listaTabelas = tabelas;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaTabelas = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarTabela(form);
    }else{
      console.log("salvar");
      salvarTabela(form);
    }


}

$scope.alterar = function(tabela){

    //delete tabela.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(tabela);
    console.log(Util.copyJson(tabela));
}


$scope.deletar = function(tabela){


    deletarTabela(tabela);

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

  TabelaService.listarAtivos().success(function(dados){

      var tabelas = JSON.stringify(dados);

      $scope.listaTabelas = dados;

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));

  });


}

function limparForm(){

  alterar = false;
  $scope.formulario = {dados:{ativo:1}};
}

function salvarTabela(dados){

  TabelaService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarTabela(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  TabelaService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarTabela(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  TabelaService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
