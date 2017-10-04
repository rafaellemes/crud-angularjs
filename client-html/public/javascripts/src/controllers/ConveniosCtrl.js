App.controller('ConveniosCtrl', ['$scope', '$base64',
                'ConvenioService','Util','$window',
    function($scope, $base64, ConvenioService, Util, $window){


$scope.formulario = {dados:{ativo:1}};

limparForm();
$scope.listaConvenios = [];


listarAtivos();




$scope.novoConvenio = function(){

  sessionStorage.convenio = undefined;
  $window.location.href = '#/admin/convenios/novo';
}
$scope.alterarConvenio = function(convenio){


  sessionStorage.convenio =  $base64.encode(JSON.stringify(convenio));
  $window.location.href = '#/admin/convenios/alterar';
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
   ConvenioService.filtrar(filtro).success(function(convenios){

        $scope.listaConvenios = convenios;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaConvenios = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarConvenio(form);
    }else{
      console.log("salvar");
      salvarConvenio(form);
    }


}

$scope.alterar = function(convenio){

    //delete convenio.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(convenio);
    console.log(Util.copyJson(convenio));
}


$scope.deletar = function(convenio){


    deletarConvenio(convenio);

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

  ConvenioService.listarAtivos().success(function(dados){

      var convenios = JSON.stringify(dados);

      $scope.listaConvenios = dados;

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));

  });


}

function limparForm(){

  alterar = false;
  $scope.formulario = {dados:{ativo:1}};
}

function salvarConvenio(dados){

  ConvenioService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarConvenio(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  ConvenioService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarConvenio(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  ConvenioService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
