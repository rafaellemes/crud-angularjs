App.controller('TabelaIACtrl', ['$scope', '$base64',
  'TabelaService', 'Util', '$window', 'TelefoneService', 'EnderecoService',
  function($scope, $base64, TabelaService, Util, $window, TelefoneService, EnderecoService) {

    $scope.msgError = "";

    $scope.showErrorMessage = false;
    $scope.showSuccessMessage = false;
    $scope.nomePagina = "Novo";
    $scope.icone = "fa-save";
    var alterar = false;

    $scope.tabela = {
      dados: {
        ativo: 1
      }
    };

    init();





    function init() {

      var tabela = sessionStorage.tabela;
      console.log("init");
        console.log(tabela);

      //var tabela = {};
      if (tabela && tabela != "undefined") {
        var jFunc = JSON.parse($base64.decode(tabela));
        console.log(Util.copyJson(jFunc));
        $scope.tabela.dados = Util.copyJson(jFunc);
        alterar = true;
        $scope.nomePagina = "Alterar";
        $scope.icone = "fa-edit"

      }

    }




    $scope.limparForm = limparForm;

    $scope.voltar = function(){
      sessionStorage.tabela = undefined;
        $window.location.href = '#/admin/tabelas';
    }

    $scope.salvar = function() {
      $scope.showErrorMessage = false;
      $scope.showSuccessMessage = false;
      var form = $scope.tabela;

      if(!Util.isEmpty($scope.form.$error)){
        $scope.showErrorMessage = true;
        return;
      }

      if (alterar) {
        console.log("alterar");
        alterarTabela(Util.copyJson(form));
      } else {
        console.log("salvar");
        salvarTabela(form);
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

    function salvarTabela(dados) {

      console.log(dados);
      TabelaService.salvar(dados).success(function(result) {
        //listarAtivos();
        //insertId%
        $scope.showSuccessMessage = true;
        $scope.tabela.dados.id = result.insertId;
        console.log(result);
        console.log(JSON.stringify(result));

        console.log($scope.tabela);

        alterar = true;


      }).error(function(data, status, headers, config) {

        console.log(JSON.stringify(data));
        //Statements de mensagem para o usuário

      });
    }



    function alterarTabela(form) {


      var pForm = Util.handlerJsonAlterar(form);
      delete pForm.dados.set.id;
      delete pForm.dados.set.dt_cadastro;

      console.log(pForm);

      TabelaService.alterar(pForm).success(function(result) {
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

}]);
