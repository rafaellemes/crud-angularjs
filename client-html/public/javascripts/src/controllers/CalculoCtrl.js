App.controller('CalculoCtrl', ['$scope', '$base64',
                'CalculoService', 'Util','$window',
    function($scope, $base64, CalculoService, Util, $window){


$scope.formulario = {dados:{ativo:1}};

limparForm();
$scope.listaCalculos = [];
$scope.listaConvenios = [];

listarAtivos();





$scope.novoCalculo = function(){

  sessionStorage.calculo = undefined;
  $window.location.href = '#/admin/calculos/novo';
}
$scope.alterarCalculo = function(calculo){


  sessionStorage.calculo =  $base64.encode(JSON.stringify(calculo));
  $window.location.href = '#/admin/calculos/alterar';
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
   CalculoService.filtrar(filtro).success(function(calculos){
     console.log("eaeaeae");
     console.log(calculos);
        $scope.listaCalculos = calculos;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaCalculos = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarCalculo(form);
    }else{
      console.log("salvar");
      salvarCalculo(form);
    }


}

$scope.alterar = function(calculo){

    //delete calculo.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(calculo);
    console.log(Util.copyJson(calculo));
}


$scope.deletar = function(calculo){


    deletarCalculo(calculo);

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

  CalculoService.listarAtivos().success(function(dados){

      var calculos = JSON.stringify(dados);

      $scope.listaCalculos = dados;
    //  console.log(dados);
      listarConvenios();

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));
    listarConvenios();
  });


}



function limparForm(){

  alterar = false;
  $scope.formulario = {dados:{ativo:1}};
}

function salvarCalculo(dados){

  CalculoService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarCalculo(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  CalculoService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarCalculo(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  CalculoService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
