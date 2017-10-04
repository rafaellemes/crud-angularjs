App.controller('ClinicaIACtrl', ['$scope', '$base64',
  'ClinicaService', 'Util', '$window', 'TabelaService', 'ConvenioService',
  function($scope, $base64, ClinicaService, Util, $window, TabelaService, ConvenioService) {

    $scope.msgError = "";

    $scope.showErrorMessage = false;
    $scope.showSuccessMessage = false;
    $scope.nomePagina = "Novo";
    $scope.icone = "fa-save";
    var alterar = false;

    $scope.clinica = {
      dados: {
        ativo: 1
      }
    };

    $scope.listaConvenios = [];

    $scope.listaTabelasClinicas = [];

    $scope.listaTabelaAtivos = [];

    $scope.convenio = {dados:{ativo:1}};

       $scope.listaConveniosClinica = [];

    init();





    function init() {

      var clinica = sessionStorage.clinica;
      console.log("init");
        console.log(clinica);

      //var clinica = {};
      if (clinica && clinica != "undefined") {
        var jFunc = JSON.parse($base64.decode(clinica));
        console.log(Util.copyJson(jFunc));
        $scope.clinica.dados = Util.copyJson(jFunc);
        alterar = true;
        $scope.nomePagina = "Alterar";
        $scope.icone = "fa-edit"

        listarConveniosClinica($scope.clinica.dados.id);
      }



    }




    $scope.limparForm = limparForm;

    $scope.voltar = function(){
      sessionStorage.clinica = undefined;
        $window.location.href = '#/admin/clinicas';
    }

    $scope.salvar = function() {
      $scope.showErrorMessage = false;
      $scope.showSuccessMessage = false;
      var form = $scope.clinica;

      if(!Util.isEmpty($scope.form.$error)){
        $scope.showErrorMessage = true;
        return;
      }

      if (alterar) {
        console.log("alterar");
        alterarClinica(Util.copyJson(form));
      } else {
        console.log("salvar");
        salvarClinica(form);
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

    function salvarClinica(dados) {

      console.log(dados);
      ClinicaService.salvar(dados).success(function(result) {
        //listarAtivos();
        //insertId%
        $scope.showSuccessMessage = true;
        $scope.clinica.dados.id = result.insertId;
        console.log(result);
        console.log(JSON.stringify(result));

        console.log($scope.clinica);

        alterar = true;


      }).error(function(data, status, headers, config) {

        console.log(JSON.stringify(data));
        //Statements de mensagem para o usuário

      });
    }



    function alterarClinica(form) {


      var pForm = Util.handlerJsonAlterar(form);
      delete pForm.dados.set.id;
      delete pForm.dados.set.dt_cadastro;

      console.log(pForm);

      ClinicaService.alterar(pForm).success(function(result) {
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

          var clinicas = JSON.stringify(dados);

          $scope.listaConvenios = dados;

          console.log(dados);

            //listarTabelasClinica($scope.clinica.dados.id);
      })
      .error(function(data, status, headers, config){

        console.log("deuRuim: " + JSON.stringify(data));

        //  listarTabelasClinica($scope.clinica.dados.id);

      });



    }

    function listarTabelasClinica(id_clinica){
      //listaTabelaAtivos

      ClinicaService.listarTabelas(id_clinica)
      .success(function(result){

        $scope.listaTabelasClinicas = result;

      })
      .error(function(data, status, headers, config){
        console.log("deuRuim: " + JSON.stringify(data));
      });

    }

    function listarTabelasAtivos(){
      //listaTabelaAtivos

      ClinicaService.listarTabelasClinica($scope.clinica.dados.id)
      .success(function(result){

      $scope.listaTabelaAtivos = result;

      })
      .error(function(data, status, headers, config){
        console.log("deuRuim: " + JSON.stringify(data));
      });
    }


    /// ---- PRODUTOS

    $scope.novoTabela = function(){

      console.log("EAEEAEAE");
      listarTabelasAtivos();

    }


    $scope.selecionarTabela = function(tabela){

      var form = {dados:{}};

      form.dados.id_tabela = tabela.id;
      form.dados.id_clinica = $scope.clinica.dados.id;

      ClinicaService.cadastrarClinicaTabela(form)
      .success(function(result){

      listarTabelasClinica($scope.clinica.dados.id);

      })
      .error(function(data, status, headers, config){
        console.log("deuRuim: " + JSON.stringify(data));
      });



    }

    $scope.deletarTabela = function(tabela){

      var form = {dados:{id:tabela.id}};

      console.log(form);
      ClinicaService.inativarClinicaTabela(form)
      .success(function(result){
        console.log(result);
        listarTabelasClinica($scope.clinica.dados.id);

      })
      .error(function(data, status, headers, config){
        console.log("deuRuim: " + JSON.stringify(data));
      });



    }


     //// --- CONVÊNIOS
      var editConvenio = false;
      $scope.novoConvenio = function(){

          editConvenio = false;
          listarConvenios();
          $scope.convenio = {dados:{ativo:1}};

      }


         $scope.editarConvenio = function(conv){
            editConvenio = true;
            listarConvenios();
            $scope.convenio.dados = Util.copyJson(conv);

           // console.log($scope.convenio) ;
          }
        $scope.salvarConvenio = function(){
          if(editConvenio){
              alterConvenio();
          }else{
              saveConvenio();
          }
      }

         function getClinicaConvenioForm(){

            var pForm = Util.handlerJsonAlterar($scope.convenio);
            delete pForm.dados.set.id;
            delete pForm.dados.set.nome;
           // delete pForm.dados.set.nome_plano;

            return pForm;

          }

        function alterConvenio(){

            var pForm = getClinicaConvenioForm();

            console.log(pForm);

            ClinicaService.alterarConvenioClinica(pForm).success(function(result) {

              listarConveniosClinica($scope.clinica.dados.id);

            }).error(function(data, status, headers, config) {
              console.log(JSON.stringify(data));
            });

          // $scope.plano =  Util.handlerJsonDepoisAlterar(pForm);

          }

        function saveConvenio(){
          // console.log("aeeeaaeeaaeaeeaaeaeaae");
            var form = {dados:{}};

            form.dados.id_clinica = $scope.clinica.dados.id;
            form.dados.id_convenio = $scope.convenio.dados.id_convenio;

            ClinicaService.cadastrarConvenioClinica(form)
            .success(function(result){

                listarConveniosClinica($scope.clinica.dados.id);

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });
      }

       function listarConveniosClinica(id_clinica){
          ClinicaService.listarConvenioClinicas(id_clinica)
          .success(function(result){
             // console.log(result);
              $scope.listaConveniosClinica = result;
               listarConvenios();

            })
            .error(function(data, status, headers, config){
               listarConvenios();
              console.log("deuRuim: " + JSON.stringify(data));
            });
      }

            $scope.deletarConvenio = function(convenio){


            var form = {dados:{id:convenio.id}};

            ClinicaService.inativarConvenioClinica(form)
            .success(function(result){
              //console.log(result);
             listarConveniosClinica($scope.clinica.dados.id);

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });

          }

}]);
