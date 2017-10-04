App.controller('PlanosCtrl', ['$scope', '$base64',
                'PlanoService','ConvenioService','Util','$window',
    function($scope, $base64, PlanoService, ConvenioService, Util, $window){


$scope.formulario = {dados:{ativo:1}};

limparForm();
$scope.listaPlanos = [];
$scope.listaConvenios = [];

listarAtivos();





$scope.novoPlano = function(){

  sessionStorage.plano = undefined;
  $window.location.href = '#/admin/planos/novo';
}
$scope.alterarPlano = function(plano){


  sessionStorage.plano =  $base64.encode(JSON.stringify(plano));
  $window.location.href = '#/admin/planos/alterar';
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
   PlanoService.filtrar(filtro).success(function(planos){

        $scope.listaPlanos = planos;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaPlanos = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarPlano(form);
    }else{
      console.log("salvar");
      salvarPlano(form);
    }


}

$scope.alterar = function(plano){

    //delete plano.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(plano);
    console.log(Util.copyJson(plano));
}


$scope.deletar = function(plano){


    deletarPlano(plano);

}

$scope.getNomeConvenio = function(id_convenio){

  var nConvenio = "";
angular.forEach($scope.listaConvenios, function(v, k){

     if(v.id === id_convenio){
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

  PlanoService.listarAtivos().success(function(dados){

      var planos = JSON.stringify(dados);

      $scope.listaPlanos = dados;
    //  console.log(dados);
      listarConvenios();

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));
    listarConvenios();
  });


}

function listarConvenios(){

  ConvenioService.listarAtivos().success(function(dados){

      var planos = JSON.stringify(dados);

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

function salvarPlano(dados){

  PlanoService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarPlano(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  PlanoService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarPlano(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  PlanoService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
