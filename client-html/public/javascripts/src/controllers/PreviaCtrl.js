App.controller('PreviaCtrl', ['$scope', '$http', '$base64', '$window', 'ClinicaService',

      function ($scope, $http, $base64, $window, ClinicaService) {

  $scope.formulario = {
   dados: {
    ativo: 1
   }
  };
  $scope.listaPrevias = [];


  limparFormulario();

       

          

$scope.novaPrevia = function(){

  sessionStorage.previa = undefined;
  $window.location.href = '#/previas/novo';
}
$scope.alterarPrevia = function(calculo){


  sessionStorage.calculo =  $base64.encode(JSON.stringify(calculo));
  $window.location.href = '#/previas/alterar';
}
          

  function limparFormulario() {

   alterar = false;
   $scope.formulario = {
    dados: {
     ativo: 1
    }
   };
  }

  $scope.limparForm = limparFormulario;


  $scope.pesquisar = function () {


   var filtro = getQueryParameters($scope.formulario.dados);
   ClinicaService.filtrar(filtro).success(function (clinicas) {
     $scope.listaPrevias = clinicas;

    })
    .error(function (data, status, headers, config) {
     $scope.listaPrevias = [];
    });
  }
  
  

  function getQueryParameters(filtro) {

   var strFiltro = "?";
   angular.forEach(filtro, function (v, k) {

    if (v !== '') {
     strFiltro += k + "=" + v + "&";
    }
   });

   return strFiltro;

  }

  $scope.selecionarClinica = function(clinica){
   sessionStorage.clinicaPrevia =  $base64.encode(JSON.stringify(clinica));
   $window.location.href = '#/previas/clinica';
  }

}]);
