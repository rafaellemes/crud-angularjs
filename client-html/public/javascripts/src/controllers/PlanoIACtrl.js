App.controller('PlanoIACtrl', ['$scope', '$base64',
  'PlanoService', 'Util', '$window',  'ConvenioService',
  function($scope, $base64, PlanoService, Util, $window,  ConvenioService) {

    $scope.msgError = "";

    $scope.showErrorMessage = false;
    $scope.showSuccessMessage = false;
    $scope.nomePagina = "Novo";
    $scope.icone = "fa-save";
    var alterar = false;

    $scope.plano = {
      dados: {
        ativo: 1
      }
    };

    $scope.listaConvenios = [];



    init();





    function init() {

      var plano = sessionStorage.plano;
      console.log("init");
        console.log(plano);

      //var plano = {};
      if (plano && plano != "undefined") {
        var jFunc = JSON.parse($base64.decode(plano));
        console.log(Util.copyJson(jFunc));
        $scope.plano.dados = Util.copyJson(jFunc);
        alterar = true;
        $scope.nomePagina = "Alterar";
        $scope.icone = "fa-edit"


      }
      listarConvenios();

    }




    $scope.limparForm = limparForm;

    $scope.voltar = function(){
      sessionStorage.plano = undefined;
        $window.location.href = '#/admin/planos';
    }

    $scope.salvar = function() {
      $scope.showErrorMessage = false;
      $scope.showSuccessMessage = false;
      var form = $scope.plano;

      if(!Util.isEmpty($scope.form.$error)){
        $scope.showErrorMessage = true;
        return;
      }

      if (alterar) {
        console.log("alterar");
        alterarPlano(Util.copyJson(form));
      } else {
        console.log("salvar");
        salvarPlano(form);
      }


    }


    $scope.isShowErrorMessage = function(){
      var isMsg =  $scope.showErrorMessage;
       //$scope.showErrorMessage = false;
      return !Util.isEmpty($scope.form.$error) && isMsg;
    }

    $scope.isShowSuccessMessage = function(){

       //$scope.showErrorMessage = false;
      return $scope.showSuccessMessage;
    }



    function limparForm() {

      alterar = false;
      $scope.form = {
        dados: {
          ativo: 1
        }
      };
    }

    function salvarPlano(dados) {

      console.log(dados);
      PlanoService.salvar(dados).success(function(result) {
        //listarAtivos();
        //insertId%
        $scope.showSuccessMessage = true;
        $scope.plano.dados.id = result.insertId;
        console.log(result);
        console.log(JSON.stringify(result));

        console.log($scope.plano);

        alterar = true;


      }).error(function(data, status, headers, config) {

        console.log(JSON.stringify(data));
        //Statements de mensagem para o usuário

      });
    }



    function alterarPlano(form) {


      var pForm = Util.handlerJsonAlterar(form);
      delete pForm.dados.set.id;
      delete pForm.dados.set.dt_cadastro;

      console.log(pForm);

      PlanoService.alterar(pForm).success(function(result) {
        //listarAtivos();
        $scope.showSuccessMessage = true;
        $scope.showErrorMessage = false;


      }).error(function(data, status, headers, config) {

        $scope.showSuccessMessage = false;
        $scope.showErrorMessage = true;
        //Statements de mensagem para o usuário
        console.log(JSON.stringify(data));
      });

      Util.handlerJsonDepoisAlterar(form);
    }




    function listarConvenios(){

      ConvenioService.listarAtivos().success(function(dados){

          var planos = JSON.stringify(dados);

          $scope.listaConvenios = dados;

          console.log(dados);


      })
      .error(function(data, status, headers, config){

        console.log("deuRuim: " + JSON.stringify(data));



      });



    }




}]);
