App.controller('ConvenioIACtrl', ['$scope', '$base64',
  'ConvenioService', 'Util', '$window', 'TelefoneService', 'EnderecoService',
  'TabelaService', 'PlanoService', 'PacienteService',
  function($scope, $base64, ConvenioService, Util, $window, TelefoneService,
    EnderecoService, TabelaService, PlanoService, PacienteService ) {

    $scope.msgError = "";

    $scope.showErrorMessage = false;
    $scope.showSuccessMessage = false;
    $scope.nomePagina = "Novo";
    $scope.icone = "fa-save";
    var alterar = false;

    $scope.convenio = {
      dados: {
        ativo: 1
      }
    };

    $scope.plano = {
      dados: {
        ativo: 1
      }
    };

    $scope.paciente = {
      dados: {
        ativo: 1
      }
    };

    $scope.convenioPlano = {
      dados: {
        ativo: 1
      }
    };

    $scope.listaTabelasConvenio = [];

    $scope.listaTabelaAtivos = [];

    $scope.listaPlanosConvenio = [];

    $scope.listaPlanosAtivos = [];

    $scope.listaPacientesConvenio = [];

    $scope.listaPacientesAtivos = [];

    init();


    function init() {

      var convenio = sessionStorage.convenio;
        console.log("init");
        console.log(convenio);

      //var convenio = {};
      if (convenio && convenio != "undefined") {
        var jFunc = JSON.parse($base64.decode(convenio));
        console.log(Util.copyJson(jFunc));
        $scope.convenio.dados = Util.copyJson(jFunc);
        alterar = true;
        $scope.nomePagina = "Alterar";
        $scope.icone = "fa-edit"
          listarTabelasConvenio($scope.convenio.dados.id);

      }

    }




    $scope.limparForm = limparForm;

    $scope.voltar = function(){
      sessionStorage.convenio = undefined;
        $window.location.href = '#/admin/convenios';
    }

    $scope.salvar = function() {
      $scope.showErrorMessage = false;
      $scope.showSuccessMessage = false;
      var form = $scope.convenio;

      if(!Util.isEmpty($scope.form.$error)){
        $scope.showErrorMessage = true;
        return;
      }

      if (alterar) {
        console.log("alterar");
        alterarConvenio(Util.copyJson(form));
      } else {
        console.log("salvar");
        salvarConvenio(form);
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

    function salvarConvenio(dados) {

      console.log(dados);
      ConvenioService.salvar(dados).success(function(result) {
        //listarAtivos();
        //insertId%
        $scope.showSuccessMessage = true;
        $scope.convenio.dados.id = result.insertId;
        console.log(result);
        console.log(JSON.stringify(result));

        console.log($scope.convenio);

        alterar = true;

          listarTabelasConvenio($scope.convenio.dados.id);


      }).error(function(data, status, headers, config) {

        console.log(JSON.stringify(data));
        //Statements de mensagem para o usuário

      });
    }



    function alterarConvenio(form) {


      var pForm = Util.handlerJsonAlterar(form);
      delete pForm.dados.set.id;
      delete pForm.dados.set.dt_cadastro;

      console.log(pForm);

      ConvenioService.alterar(pForm).success(function(result) {
        //listarAtivos();
        $scope.showSuccessMessage = true;
        $scope.showErrorMessage = false;

        listarTabelasConvenio($scope.convenio.dados.id);

      }).error(function(data, status, headers, config) {

        $scope.showSuccessMessage = false;
        $scope.showErrorMessage = true;
        //Statements de mensagem para o usuário
        console.log(JSON.stringify(data));
      });

      Util.handlerJsonDepoisAlterar(form);
    }


        function listarTabelasConvenio(id_convenio){
          //listaTabelaAtivos

          ConvenioService.listarTabelas(id_convenio)
          .success(function(result){

            $scope.listaTabelasConvenio = result;
            listarTabelasPlano($scope.convenio.dados.id);

          })
          .error(function(data, status, headers, config){
            console.log("deuRuim: " + JSON.stringify(data));
          });

        }

        function listarTabelasAtivos(){
          //listaTabelaAtivos

          ConvenioService.listarTabelasConvenio($scope.convenio.dados.id)
          .success(function(result){

          $scope.listaTabelaAtivos = result;

          })
          .error(function(data, status, headers, config){
            console.log("deuRuim: " + JSON.stringify(data));
          });
        }


        /// ---- PRODUTOS

        $scope.novoTabela = function(){

          listarTabelasAtivos();

        }


        $scope.selecionarTabela = function(tabela){

          $scope.listaTabelasConvenio.push(tabela);

        }

        function persisteTabela(tabela){
          var form = {dados:{}};

          form.dados.id_tabela = tabela.id;
          form.dados.id_convenio_plano = $scope.convenio.dados.id;
          form.dados.multiplos = tabela.multiplos;

          ConvenioService.cadastrarConvenioTabela(form)
          .success(function(result){

          listarTabelasConvenio($scope.convenio.dados.id);

          })
          .error(function(data, status, headers, config){
            console.log("deuRuim: " + JSON.stringify(data));
          });
        }

        function alteraTabela(tabela){

        }

        $scope.salvarTabela = function(tabela){

          if(tabela.id_convenio_plano){
            alteraTabela(tabela);
          }else{
            persisteTabela(tabela);
          }

          console.log($scope.convenio.dados.id);
          console.log(tabela);
          /**/

        }



        $scope.deletarTabela = function(tabela){

          var form = {dados:{id:tabela.id}};

          console.log(form);
          ConvenioService.inativarConvenioTabela(form)
          .success(function(result){
            console.log(result);
            listarTabelasConvenio($scope.convenio.dados.id);

          })
          .error(function(data, status, headers, config){
            console.log("deuRuim: " + JSON.stringify(data));
          });



        }

          /// ---- PLANOS

          var editPlan = false;

          $scope.novoPlano = function(){

            editPlan = false;
            listarPlanosAtivos();
            $scope.plano = {dados:{ativo:1}};


          }


          $scope.editarPlano = function(plano){
            editPlan = true;
            $scope.plano.dados = Util.copyJson(plano);
            //listarPlanosAtivos();
            sessionStorage.plano = $base64.encode(JSON.stringify(plano));
            sessionStorage.telaAnterior = $base64.encode($scope.nomePagina);

            $window.location.href = '#/admin/convenios/plano';
          }

          $scope.salvarPlano = function(){

            if(editPlan){
              alterPlano()
            }else{
              savePlano()
            }

          }

          $scope.deletarPlano = function(plano){


            var form = {dados:{id:plano.id}};

            ConvenioService.inativarConvenioPlano(form)
            .success(function(result){
              console.log(result);
              listarTabelasPlano($scope.convenio.dados.id);

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });

          }

          function listarPlanosAtivos(){

            PlanoService.listarAtivos()
            .success(function(result){
                $scope.listaPlanosAtivos = result;
            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });
          }

          function savePlano(){


            var form = {dados:{}};

            form.dados.id_plano = $scope.plano.dados.id_plano;
            form.dados.id_convenio = $scope.convenio.dados.id;
            form.dados.multiplos = $scope.plano.dados.multiplos;

            ConvenioService.cadastrarConvenioPlano(form)
            .success(function(result){

            listarTabelasPlano($scope.convenio.dados.id);

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });



          }

          function alterPlano(){

            var pForm = getPlanoConvenioForm();

            console.log(pForm);

            ConvenioService.alterarConvenioPlano(pForm).success(function(result) {

              listarTabelasPlano($scope.convenio.dados.id);

            }).error(function(data, status, headers, config) {
              console.log(JSON.stringify(data));
            });

            Util.handlerJsonDepoisAlterar($scope.plano);

          }

          function listarTabelasPlano(id_convenio){

            ConvenioService.listarPlanos(id_convenio)
            .success(function(result){
              $scope.listaPlanosConvenio = result;
              //listarPacientes($scope.convenio.dados.id);
            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });

          }

          function getPlanoConvenioForm(){

            var pForm = Util.handlerJsonAlterar($scope.plano);
            console.log("alterPlano PLANO");
            console.log(pForm);
            delete pForm.dados.set.id;
            delete pForm.dados.set.descricao;
            delete pForm.dados.set.id_convenio;
            delete pForm.dados.set.nome;
            delete pForm.dados.set.ativo;

            return pForm;

          }









}]);
