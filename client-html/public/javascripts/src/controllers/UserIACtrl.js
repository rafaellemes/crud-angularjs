App.controller('UserIACtrl', ['$scope', '$base64',
  'UserService', 'Util', '$window',
  function($scope, $base64, UserService, Util, $window) {

    $scope.msgError = "";

    $scope.showErrorMessage = false;
    $scope.showSuccessMessage = false;
    $scope.nomePagina = "Novo";
    $scope.icone = "fa-save";
    var alterar = false;

    $scope.usuario = {
      dados: {
        ativo: 1
      }
    };

    $scope.listaPerfis = [];
    $scope.testeira = "";
    init();





    function init() {

      var usuario = sessionStorage.user;
      console.log("init");
        console.log(usuario);

        listarPerfis();
      //var usuario = {};
      if (usuario && usuario != "undefined") {
        var jFunc = JSON.parse($base64.decode(usuario));
        console.log(Util.copyJson(jFunc));
        $scope.usuario.dados = Util.copyJson(jFunc);
        alterar = true;
        $scope.nomePagina = "Alterar";
        $scope.icone = "fa-edit"
        $scope.usuario.dados.confirm =   $scope.usuario.dados.senha;


      }


    }




    $scope.limparForm = limparForm;

    $scope.voltar = function(){
      sessionStorage.user = undefined;
        $window.location.href = '#/admin/usuarios';
    }

    $scope.salvar = function() {
      $scope.showErrorMessage = false;
      $scope.showSuccessMessage = false;
      var form = $scope.usuario;

      if(!Util.isEmpty($scope.form.$error)){
        $scope.showErrorMessage = true;
        return;
      }
      if($scope.usuario.dados.senha !==  $scope.usuario.dados.confirm){
        $scope.showErrorMessage = true;
        return;
      }

      if (alterar) {
        console.log("alterar");
        alterarUser(Util.copyJson(form));
      } else {
        console.log("salvar");
        salvarUser(form);
      }


    }


    $scope.isShowErrorMessage = function(){
      var isMsg =  $scope.showErrorMessage;
       //$scope.showErrorMessage = false;
      return isMsg ;//|| !Util.isEmpty($scope.form.$error);
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

    function salvarUser(dados) {
      var confirm = dados.dados.confirm;
      delete dados.dados.confirm;

      //console.log(dados);
      UserService.salvar(dados).success(function(result) {
        //listarAtivos();
        //insertId%
        $scope.showSuccessMessage = true;
        $scope.usuario.dados.id = result.insertId;
        console.log(result);
        console.log(JSON.stringify(result));

        console.log($scope.usuario);

        alterar = true;

        dados.dados.confirm = confirm;

      }).error(function(data, status, headers, config) {

        console.log(JSON.stringify(data));
        //Statements de mensagem para o usuário
        dados.dados.confirm = confirm;
      });



    }



    function alterarUser(form) {

      var confirm = form.dados.confirm;

      var pForm = Util.handlerJsonAlterar(form);
      delete pForm.dados.set.id;
      delete pForm.dados.set.dt_cadastro;
      delete pForm.dados.set.confirm;

      console.log(pForm);

      UserService.alterar(pForm).success(function(result) {
        //listarAtivos();
        $scope.showSuccessMessage = true;
        $scope.showErrorMessage = false;

        pForm = Util.handlerJsonDepoisAlterar(pForm);
        pForm.dados.confirm = confirm;

      }).error(function(data, status, headers, config) {

        $scope.showSuccessMessage = false;
        $scope.showErrorMessage = true;

        pForm = Util.handlerJsonDepoisAlterar(pForm);
        pForm.dados.confirm = confirm;
        //Statements de mensagem para o usuário
        console.log(JSON.stringify(data));
      });



    }




    function listarPerfis(){

      UserService.listarPerfis().success(function(dados){

          //var usuarios = JSON.stringify(dados);
          console.log(Util.copyJson(dados));
          $scope.listaPerfis = Util.copyJson(dados);

          //console.log(dados);
      })
      .error(function(data, status, headers, config){

        console.log("deuRuim: " + JSON.stringify(data));

      });


    }


}]);
