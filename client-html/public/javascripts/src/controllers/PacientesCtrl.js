App.controller('PacientesCtrl', ['$scope', '$base64',
                'PacienteService','Util','$window',
    function($scope, $base64, PacienteService, Util, $window){


$scope.formulario = {dados:{id_tipo_pessoa:2, ativo:1}};

limparForm();
$scope.listaPacientes = [];


listarAtivos();




$scope.novoPaciente = function(){

  sessionStorage.paciente = undefined;
  $window.location.href = '#/admin/pacientes/novo';
}
$scope.alterarPaciente = function(paciente){


  sessionStorage.paciente =  $base64.encode(JSON.stringify(paciente));
  $window.location.href = '#/admin/pacientes/alterar';
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
   PacienteService.filtrar(filtro).success(function(pacientes){

        $scope.listaPacientes = pacientes;

    })
    .error(function(data, status, headers, config){
      //console.log("deuRuim: " + JSON.stringify(data));
      //Info Msg de que não há registro para pesquisa
      $scope.listaPacientes = [];
    });
};

$scope.salvar = function(){

    var form = $scope.formulario;

    if(alterar){
      console.log("alterar");
      alterarPaciente(form);
    }else{
      console.log("salvar");
      salvarPaciente(form);
    }


}

$scope.alterar = function(paciente){

    //delete paciente.__proto__;
    alterar = true;
    $scope.formulario.dados = Util.copyJson(paciente);
    console.log(Util.copyJson(paciente));
}


$scope.deletar = function(paciente){


    deletarPaciente(paciente);

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

  PacienteService.listarAtivos().success(function(dados){

      var pacientes = JSON.stringify(dados);

      $scope.listaPacientes = dados;

  })
  .error(function(data, status, headers, config){

    console.log("deuRuim: " + JSON.stringify(data));

  });


}

function limparForm(){

  alterar = false;
  $scope.formulario = {dados:{id_tipo_pessoa:2, ativo:1}};
}

function salvarPaciente(dados){

  PacienteService.salvar(dados).success(function(result){
    listarAtivos();
    limparForm();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário

  });
}


function deletarPaciente(form){

  var  pForm = Util.handlerJsonDeletar(form);
//  console.log(pForm);
  PacienteService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){
    //Statements de mensagem para o usuário
  //  console.log(JSON.stringify(data));
  });

}

function alterarPaciente(form){

  var  pForm = Util.handlerJsonAlterar(form);
//  console.log(pForm);
  PacienteService.alterar(pForm).success(function(result){
    listarAtivos();
  }).error(function(data, status, headers, config){

    //Statements de mensagem para o usuário
    console.log(JSON.stringify(data));
  });
}

}]);
