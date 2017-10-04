App.controller('ConvenioPlanoCtrl', ['$scope', '$base64',
  'ConvenioService', 'Util', '$window',
  'TabelaService', 'PlanoService',
  function($scope, $base64, ConvenioService, Util, $window,
     TabelaService, PlanoService ) {

    $scope.msgError = "";

    $scope.showErrorMessage = false;
    $scope.showSuccessMessage = false;
    $scope.nomePagina = "Novo";
    $scope.icone = "fa-save";
    var alterar = false;




    $scope.convenioPlano = {
      dados: {
        ativo: 1
      }
    };

    $scope.listaTabelasConvenio = [];
    $scope.listaTabelaAtivos = [];



    init();


    function init() {

      var plano = sessionStorage.plano;
      var telaAnterior = sessionStorage.telaAnterior;


      if(plano && plano != "undefined"){
          var jFunc = JSON.parse($base64.decode(plano));
          $scope.convenioPlano.dados = Util.copyJson(jFunc);
          listarTabelasConvenio($scope.convenioPlano.dados.id);
      }

      if(telaAnterior && telaAnterior != "undefined"){
        $scope.nomePagina = $base64.decode(telaAnterior);
      }



    }




    $scope.limparForm = limparForm;

    $scope.voltar = function(){
      //sessionStorage.convenio = undefined;
        $window.location.href = '#/admin/convenios/'+$scope.nomePagina.toLowerCase();
    }

    $scope.salvar = function() {
      $scope.showErrorMessage = false;
      $scope.showSuccessMessage = false;


      if(!Util.isEmpty($scope.form.$error)){
        $scope.showErrorMessage = true;
        return;
      }
      console.log("SALVAR");
      if($scope.listaTabelasConvenio.length > 0){
        try{
          $scope.listaTabelasConvenio.forEach(function(tabela){

            $scope.salvarTabela(tabela);

          });
          //listarTabelasConvenio($scope.convenioPlano.dados.id);
          $scope.showSuccessMessage = true;
          $scope.showErrorMessage = false;
        }catch(error){
          $scope.showSuccessMessage = false;
          $scope.showErrorMessage = true;
        }

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




        /// ---- PRODUTOS


                function listarTabelasConvenio(id_convenio_plano){
                  //listaTabelaAtivos

                  ConvenioService.listarTabelas(id_convenio_plano)
                  .success(function(result){

                    $scope.listaTabelasConvenio = result;

                  })
                  .error(function(data, status, headers, config){
                    console.log("deuRuim: " + JSON.stringify(data));
                  });

                }

                function listarTabelasAtivos(){
                  //listaTabelaAtivos

                  ConvenioService.listarTabelasConvenio($scope.convenioPlano.dados.id)
                  .success(function(result){

                  $scope.listaTabelaAtivos = result;

                  })
                  .error(function(data, status, headers, config){
                    console.log("deuRuim: " + JSON.stringify(data));
                  });
                }

        $scope.novoTabela = function(){

          listarTabelasAtivos();

        }


        $scope.selecionarTabela = function(tabela){

          $scope.listaTabelasConvenio.push(tabela);

        }

        function persisteTabela(tabela){
          var form = {dados:{}};

          form.dados.id_tabela = tabela.id;
          form.dados.id_convenio_plano = $scope.convenioPlano.dados.id;
          form.dados.multiplos = tabela.multiplos;
          console.log("persisteTabela");
          console.log(form);

          ConvenioService.cadastrarConvenioTabela(form)
          .error(function(data, status, headers, config){

            console.log("deuRuim: " + JSON.stringify(data));
            throw JSON.stringify(data);
          });
        }

        function alteraTabela(tabela){
            var form = {dados:{id:tabela.id_convenio_plano, set:{multiplos:tabela.multiplos}}};
            console.log(form);
           ConvenioService.alterarConvenioTabela(form)
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
                throw JSON.stringify(data);
            });
        }

        $scope.salvarTabela = function(tabela){
          try{
          if(tabela.id_convenio_plano){
            console.log("alterar tabela");
            alteraTabela(tabela);
          }else{
            persisteTabela(tabela);
          }

          console.log($scope.convenioPlano.dados.id);
          console.log(tabela);
        }catch(err){
            throw err;
        }
          /**/

        }



        $scope.deletarTabela = function(tabela){

          if(tabela.id_convenio_plano){

            var form = {dados:{id:tabela.id_convenio_plano}};

            console.log(form);
            ConvenioService.inativarConvenioTabela(form)
            .success(function(result){
              console.log(result);
              //listarTabelasConvenio($scope.convenioPlano.dados.id);
              $scope.listaTabelasConvenio.splice($scope.listaTabelasConvenio.indexOf(tabela),1);

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });

          }else{
            $scope.listaTabelasConvenio.splice($scope.listaTabelasConvenio.indexOf(tabela),1);
          }

        }







}]);
