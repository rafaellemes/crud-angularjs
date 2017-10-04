App.controller('MedicosCtrl', ['$scope', '$base64',
                'MedicoService','Util','$window',
    function($scope, $base64, MedicoService, Util, $window){


$scope.formulario = {dados:{id_tipo_pessoa:3, ativo:1}};

limparForm();
$scope.listaMedicos = [];


listarAtivos();




$scope.novoMedico = function(){

  sessionStorage.medico = undefined;
  $window.location.href = '#/admin/medicos/novo';
}
$scope.alterarMedico = function(medico){


  sessionStorage.medico =  $base64.encode(JSON.stringify(medico));
  $window.location.href = '#/admin/medicos/alterar';
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
   MedicoService.filtrar(filtro).success(function(medicos){

        $scope.listaMedicos = medicos;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaMedicos = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarMedico(form);
    }else{
      console.log("salvar");
      salvarMedico(form);
    }


}

$scope.alterar = function(medico){

    //delete medico.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(medico);
    console.log(Util.copyJson(medico));
}


$scope.deletar = function(medico){


    deletarMedico(medico);

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

  MedicoService.listarAtivos().success(function(dados){

      var medicos = JSON.stringify(dados);

      $scope.listaMedicos = dados;

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));

  });


}

function limparForm(){

  alterar = false;
  $scope.formulario = {dados:{id_tipo_pessoa:3, ativo:1}};
}

function salvarMedico(dados){

  MedicoService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarMedico(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  MedicoService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarMedico(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  MedicoService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
