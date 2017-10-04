App.controller('ClinicasCtrl', ['$scope', '$base64',
                'ClinicaService','ConvenioService','Util','$window',
    function($scope, $base64, ClinicaService, ConvenioService, Util, $window){


$scope.formulario = {dados:{ativo:1}};

limparForm();
$scope.listaClinicas = [];
$scope.listaConvenios = [];

listarAtivos();





$scope.novoClinica = function(){

  sessionStorage.clinica = undefined;
  $window.location.href = '#/admin/clinicas/novo';
}
$scope.alterarClinica = function(clinica){


  sessionStorage.clinica =  $base64.encode(JSON.stringify(clinica));
  $window.location.href = '#/admin/clinicas/alterar';
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
   ClinicaService.filtrar(filtro).success(function(clinicas){
     console.log("eaeaeae");
     console.log(clinicas);
        $scope.listaClinicas = clinicas;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaClinicas = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarClinica(form);
    }else{
      console.log("salvar");
      salvarClinica(form);
    }


}

$scope.alterar = function(clinica){

    //delete clinica.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(clinica);
    console.log(Util.copyJson(clinica));
}


$scope.deletar = function(clinica){


    deletarClinica(clinica);

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

  ClinicaService.listarAtivos().success(function(dados){

      var clinicas = JSON.stringify(dados);

      $scope.listaClinicas = dados;
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

      var clinicas = JSON.stringify(dados);

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

function salvarClinica(dados){

  ClinicaService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarClinica(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  ClinicaService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarClinica(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  ClinicaService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
