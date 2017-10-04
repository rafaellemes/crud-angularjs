App.controller('PacienteIACtrl', ['$scope', '$base64',
  'PacienteService', 'Util', '$window', 'TelefoneService', 'EnderecoService', 'ConvenioService',
  function($scope, $base64, PacienteService, Util, $window, TelefoneService, EnderecoService, ConvenioService) {

    $scope.msgError = "";
    $scope.msgEndError = "";
    $scope.showTelErrorMessage = false;
    $scope.showTelSuccessMessage = false;

    $scope.showEndErrorMessage = false;
    $scope.showEndSuccessMessage = false;

    $scope.showErrorMessage = false;
    $scope.showSuccessMessage = false;
    $scope.nomePagina = "Novo";
    $scope.icone = "fa-save";
    var alterar = false;
    var alterarTelefone = false;
    var alterarEndereco = false;


    $scope.listaEndereco = [];
    $scope.listaTelefone = [];

    $scope.paciente = {
      dados: {
        id_tipo_pessoa: 2,
        ativo: 1
      }
    };

    $scope.endereco = {
      dados: {
      },
      comp:{
        dados:{}
      }
    };


    $scope.telefone = {
      dados: {

      }
    };

    $scope.tiposTelefone = [
      {id: 1, name: 'Residêncial'},
      {id: 2, name: 'Comercial'},
      {id: 3, name: 'Celular'}
    ];

    $scope.tiposEndereco = [
      {id: 1, name: 'Comercial'},
      {id: 2, name: 'Residêncial'}
    ];


    $scope.listaConveniosPaciente = [];

    $scope.listaConveniosAtivos = [];

    $scope.listaPlanosConveniosAtivos = [];

    $scope.convenio = {dados:{ativo:1}};


    init();





    function init() {

      var paciente = sessionStorage.paciente;
      //console.log("init");
        //console.log(paciente);

      //var paciente = {};
      if (paciente && paciente != "undefined") {
        var jFunc = JSON.parse($base64.decode(paciente));
        //console.log(Util.copyJson(jFunc));
        $scope.paciente.dados = Util.copyJson(jFunc);
        if($scope.paciente.dados.dt_nascimento){
          $scope.paciente.dados.dt_nascimento = Util.handlerDateToView($scope.paciente.dados.dt_nascimento);
        }
        alterar = true;
        $scope.nomePagina = "Alterar";
        $scope.icone = "fa-edit"

        //listarTelefonePessoa($scope.paciente.dados.id);
        listarConveniosPaciente($scope.paciente.dados.id);
      }

    }




    $scope.limparForm = limparForm;

    $scope.voltar = function(){
      sessionStorage.paciente = undefined;
        $window.location.href = '#/admin/pacientes';
    }

    $scope.salvar = function() {
      $scope.showErrorMessage = false;
      $scope.showSuccessMessage = false;
      var form = $scope.paciente;


      if(!Util.isEmpty($scope.form.$error)){
        $scope.showErrorMessage = true;
        return;
      }


      if (alterar) {
       // console.log("alterar");
        alterarPaciente(Util.copyJson(form));
      } else {
        //console.log("salvar");
        salvarPaciente(form);
      }


    }

    // telefones

      $scope.deletarTelefone = function(telefone){
        $scope.showTelErrorMessage = false;
        $scope.showTelSuccessMessage = false;


          var toDel = {dados:{}};
           toDel.dados.id_telefone_pessoa = telefone.id_telefone_pessoa;
           toDel.dados.id = telefone.id;

      TelefoneService.deletarTelefonePessoa(toDel)
        .success(function(result){

            listarTelefonePessoa($scope.paciente.dados.id);

        })
        .error(function(data, status, headers, config){

          $scope.msgError = "ERRO: Houve problemas ao deletar o telefone!";
          $scope.showTelErrorMessage = true;
            $scope.showTelSuccessMessage = false;

          console.log(JSON.stringify(data));
        });


      }

      $scope.novoTelefone = function(){
        $scope.showTelErrorMessage = false;
        $scope.showTelSuccessMessage = false;
        alterarTelefone = false;
        $scope.telefone = {dados: {}};


      }

      $scope.alterarTelefone = function(telefone){
        $scope.showTelErrorMessage = false;
        $scope.showTelSuccessMessage = false;
        alterarTelefone = true;
        $scope.telefone.dados = Util.copyJson(telefone);
        console.log(  $scope.telefone);
      }


      $scope.salvarTelefone = function()
      {
        $scope.showTelErrorMessage = false;
        $scope.showTelSuccessMessage = false;

        if(!Util.isEmpty($scope.frmTel.$error))
        {
            $scope.msgError = "Por favor, verifique os erros!";
            $scope.showTelErrorMessage = true;
            return;
        }

        if(alterarTelefone){
          alterTelefone(Util.copyJson($scope.telefone));
        }else{
          cadastrarTelefone($scope.telefone);
        }


      }



      function alterTelefone(telefone){


          var tForm = Util.handlerJsonAlterar(telefone);
          delete tForm.dados.set.tipo;

          TelefoneService.alterar(tForm)
          .success(function(result){



            $scope.showTelSuccessMessage = true;
            listarTelefonePessoa($scope.paciente.dados.id);

            $scope.telefone = Util.handlerJsonDepoisAlterar(telefone);
            console.log($scope.telefone);

          })
          .error(function(data, status, headers, config){

            $scope.msgError = "ERRO: Houve problemas ao salvar/alterar o telefone!";
            $scope.showTelErrorMessage = true;

            console.log(JSON.stringify(data));
          });

            //refreshTelefone(telefone);
      }

      function refreshTelefone(telefone){

        TelefoneService.findById(telefone.dados.id)
        .success(function(result){
          console.log("Refresh");
          console.log(result);
          telefone.dados = result[0];
          console.log(telefone);

        })
        .error(function(data, status, headers, config){
          $scope.msgError = "ERRO: Houve problemas ao salvar/alterar o telefone!";
          $scope.showTelErrorMessage = true;
            $scope.showTelSuccessMessage = false;
        });

      }

      function cadastrarTelefone(telefone)
      {

        console.log(telefone);

        TelefoneService.salvar(telefone).success(function(result){

          telefone.dados.id = result.insertId;

          var tel_pessoa = {dados:{}};
          tel_pessoa.dados.id_telefone = telefone.dados.id;
          tel_pessoa.dados.id_pessoa = $scope.paciente.dados.id;
          console.log(tel_pessoa);
          salvarTelPessoa(tel_pessoa);

        }).error(function(data, status, headers, config){

          $scope.msgError = "ERRO: Houve problemas ao salvar/alterar o telefone!";
          $scope.showTelErrorMessage = true;
            console.log(JSON.stringify(data));

        });

      }

    function salvarTelPessoa(telPessoa)  {

      TelefoneService.cadastrarTelefonePessoa(telPessoa)
      .success(function(result){

        listarTelefonePessoa(telPessoa.dados.id_pessoa);

        $scope.showTelSuccessMessage = true;
        alterarTelefone = true;

      })
      .error(function(data, status, headers, config){
        $scope.msgError = "ERRO: Houve problemas ao salvar/alterar o telefone!";
        $scope.showTelErrorMessage = true;
        console.log(JSON.stringify(data));
      });


    }


    function listarEnderecoPessoa(id_pessoa){

      EnderecoService.consultarEnderecoPessoa(id_pessoa)
      .success(function(result){
        $scope.listaEndereco = result;
        console.log("endereco");
        console.log(result);
      })
      .error(function(data, status, headers, config){
        //$scope.msgError = "ERRO: Houve problemas ao salvar/alterar o telefone!";
        //$scope.showTelErrorMessage = true;
        console.log(JSON.stringify(data));
      });

    }

    function listarTelefonePessoa(id_pessoa){
      //$scope.listaTelefone

      TelefoneService.consultarTelefonePessoa(id_pessoa)
      .success(function(result){
        $scope.listaTelefone = result;
        listarEnderecoPessoa($scope.paciente.dados.id);
      })
      .error(function(data, status, headers, config){
        //$scope.msgError = "ERRO: Houve problemas ao salvar/alterar o telefone!";
        //$scope.showTelErrorMessage = true;
        listarEnderecoPessoa($scope.paciente.dados.id);
        console.log(JSON.stringify(data));
      });

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



    $scope.consultarCEP = function(){

      var nEndereco =   EnderecoService.consultarCEP($scope.endereco.dados.cep);

      nEndereco.then(function(params){
          $scope.endereco.dados = params.data[0];
      });


    }

    $scope.novoEndereco = function(){

      $scope.showEndErrorMessage = false;
      $scope.showEndSuccessMessage = false;
      alterarEndereco = false;

      $scope.endereco = {
        dados: {
        },
        comp:{
          dados:{}
        }
      };

    }

    $scope.alterarEndereco = function(endereco){

      $scope.showEndErrorMessage = false;
      $scope.showEndSuccessMessage = false;
      alterarEndereco = true;
      var jEndereco = Util.copyJson(endereco);

      populateEndereco(jEndereco);


      console.log( jEndereco);

    }

    function populateEndereco(jEndereco){
      $scope.endereco.dados.id = jEndereco.id;
      $scope.endereco.dados.logradouro = jEndereco.logradouro;
      $scope.endereco.dados.cep = jEndereco.cep;
      $scope.endereco.dados.bairro = jEndereco.bairro;
      $scope.endereco.dados.cidade = jEndereco.cidade;
      $scope.endereco.dados.estado = jEndereco.estado;

      $scope.endereco.comp.dados.id = jEndereco.id_endereco_pessoa;
      $scope.endereco.comp.dados.id_pessoa = jEndereco.id_pessoa;
      $scope.endereco.comp.dados.id_tipo_endereco = jEndereco.id_tipo_endereco;
      $scope.endereco.comp.dados.numero = jEndereco.numero;
      $scope.endereco.comp.dados.complemento = jEndereco.complemento;
    }

    $scope.deletarEndereco = function(endereco){

      var jEndereco = Util.copyJson(endereco);
      //populateEndereco();

      $scope.showEndErrorMessage = false;
      $scope.showEndSuccessMessage = false;


      EnderecoService.deletarEnderecoPessoa(jEndereco.id_endereco_pessoa)
      .success(function(result){
        listarEnderecoPessoa($scope.paciente.dados.id);
      })
      .error(function(data, status, headers, config){

          $scope.msgEndError = "ERRO: Houve problemas ao deletar o telefone!";
          $scope.showEndErrorMessage = true;
          $scope.showEndSuccessMessage = false;

        console.log(JSON.stringify(data));
      });



    }

    $scope.salvarEndereco = function(){

      $scope.showEndErrorMessage = false;
      $scope.showEndSuccessMessage = false;

      if(!Util.isEmpty($scope.frmEnd.$error))
      {
          $scope.msgEndError = "Por favor, verifique os erros!";
          $scope.showEndErrorMessage = true;
          return;
      }else if(!$scope.endereco.dados.id){
        $scope.msgEndError = "Por favor, clique em consultar CEP";
        $scope.showEndErrorMessage = true;
        return;
      }


      if(alterarEndereco){
        alterEnderecoPessoa(Util.copyJson($scope.endereco.comp));
      }else{
        cadastrarEnderecoPessoa($scope.endereco.dados.id);
      }

    }


    function alterEnderecoPessoa(endereco_pessoa){

      var ep = Util.handlerJsonAlterar(endereco_pessoa);
      ep.dados.id_endereco = $scope.endereco.dados.id;
      delete ep.dados.set.tipo;

      EnderecoService.alterarEnderecoPessoa(ep)
      .success(function(result){
        $scope.showEndSuccessMessage = true;
        listarEnderecoPessoa($scope.paciente.dados.id);

      })
      .error(function(data, status, headers, config){
        $scope.msgEndError = "ERRO: Houve problemas ao salvar/alterar o endereco!";
        $scope.showEndErrorMessage = true;
        console.log(JSON.stringify(data));
      });

      $scope.endereco.comp = Util.handlerJsonDepoisAlterar(endereco_pessoa);
    }

    function cadastrarEnderecoPessoa(id_endereco){
      var insert  = {dados:{}};

      insert.dados = $scope.endereco.comp.dados;
      insert.dados.id_endereco = id_endereco;
      insert.dados.id_pessoa = $scope.paciente.dados.id;

      EnderecoService.cadastrarEnderecoPessoa(insert)
      .success(function(result){
        //result.insertId
          $scope.endereco.comp.dados.id = result.insertId;

          listarEnderecoPessoa($scope.paciente.dados.id);
          $scope.showEndSuccessMessage = true;
          alterarEndereco = true;
      })
      .error(function(data, status, headers, config){
          $scope.msgEndError = "ERRO: Houve problemas ao salvar/alterar o endereço!";
          $scope.showEndErrorMessage = true;
          console.log(JSON.stringify(data));

      });
    }







    function limparForm() {

      alterar = false;
      $scope.form = {
        dados: {
          id_tipo_pessoa: 2,
          ativo: 1
        }
      };
    }

    function salvarPaciente(dados) {

      console.log(dados);
      PacienteService.salvar(dados).success(function(result) {
        //listarAtivos();
        //insertId%
        $scope.showSuccessMessage = true;
        $scope.paciente.dados.id = result.insertId;
        console.log(result);
        console.log(JSON.stringify(result));

        console.log($scope.paciente);

        alterar = true;



      }).error(function(data, status, headers, config) {

        console.log(JSON.stringify(data));
        //Statements de mensagem para o usuário

      });
    }



    function alterarPaciente(form) {


      var pForm = Util.handlerJsonAlterar(form);
      delete pForm.dados.set.id;
      delete pForm.dados.set.dt_cadastro;
      var nDate = Util.handlerDate(pForm.dados.set.dt_nascimento);
      pForm.dados.set.dt_nascimento = nDate;

      //console.log(  pForm.dados.set.dt_nascimento);

      console.log(pForm);

    PacienteService.alterar(pForm).success(function(result) {
        //listarAtivos();
        $scope.showSuccessMessage = true;
        $scope.showErrorMessage = false;
                
        form =  Util.handlerJsonDepoisAlterar(pForm);
        form.dados.dt_nascimento = Util.handlerDate(form.dados.dt_nascimento);

      }).error(function(data, status, headers, config) {

        $scope.showSuccessMessage = false;
        $scope.showErrorMessage = true;
        //Statements de mensagem para o usuário
        console.log(JSON.stringify(data));
      });


    }

      //// --- CONVÊNIOS
      var editConvenio = false;
      $scope.novoConvenio = function(){

          editConvenio = false;
          listarConveniosAtivos();
          $scope.convenio = {dados:{ativo:1}};

      }


         $scope.editarConvenio = function(conv){
            editConvenio = true;
            listarConveniosAtivos();
            $scope.convenio.dados = Util.copyJson(conv);
             listPlanos($scope.convenio.dados.id_convenio)

           // console.log($scope.convenio) ;
          }


      $scope.salvarConvenio = function(){
          if(editConvenio){
              alterConvenio();
          }else{
              saveConvenio();
          }
      }


      $scope.deletarConvenio = function(convenio){


            var form = {dados:{id:convenio.id}};

            ConvenioService.inativarConvenioPaciente(form)
            .success(function(result){
              //console.log(result);
              listarConveniosPaciente($scope.paciente.dados.id);

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });

          }




      $scope.listarPlanos = function(id_convenio){

          listPlanos(id_convenio);


      }

      function listPlanos(id_convenio){
          ConvenioService.listarPlanos(id_convenio)
            .success(function(result){
              //console.log(result);
                 $scope.listaPlanosConveniosAtivos = result;

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });
      }

      function saveConvenio(){
          // console.log("aeeeaaeeaaeaeeaaeaeaae");
            var form = {dados:{}};

            form.dados.id_pessoa = $scope.paciente.dados.id;
            form.dados.id_convenio = $scope.convenio.dados.id_convenio;
            form.dados.id_plano = $scope.convenio.dados.id_plano;
            form.dados.matricula = $scope.convenio.dados.matricula;
            form.dados.valor_consulta = $scope.convenio.dados.valor_consulta;

            //console.log(form);

            ConvenioService.cadastrarConvenioPaciente(form)
            .success(function(result){

                listarConveniosPaciente($scope.paciente.dados.id);

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });
      }


      function listarConveniosAtivos(){
          ConvenioService.listarAtivos()
          .success(function(result){
              //console.log(result);
              $scope.listaConveniosAtivos = result;

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });
      }

      function listarConveniosPaciente(id_pessoa){
          ConvenioService.listarConveniosPaciente(id_pessoa)
          .success(function(result){
             // console.log(result);
              $scope.listaConveniosPaciente = result;
              listarTelefonePessoa(id_pessoa);

            })
            .error(function(data, status, headers, config){
              listarTelefonePessoa(id_pessoa);
              //console.log("deuRuim: " + JSON.stringify(data));
            });
      }

        function alterConvenio(){

            var pForm = getPacienteConvenioForm();

            console.log(pForm);

            ConvenioService.alterarConvenioPaciente(pForm).success(function(result) {

              listarConveniosPaciente($scope.paciente.dados.id);

            }).error(function(data, status, headers, config) {
              console.log(JSON.stringify(data));
            });

          // $scope.plano =  Util.handlerJsonDepoisAlterar(pForm);

          }

          function listarPacientes(id_convenio){

            ConvenioService.listarPacientes(id_convenio)
            .success(function(result){
              $scope.listaPacientesConvenio = result;

            })
            .error(function(data, status, headers, config){
              console.log("deuRuim: " + JSON.stringify(data));
            });

          }

          function getPacienteConvenioForm(){

            var pForm = Util.handlerJsonAlterar($scope.convenio);
            delete pForm.dados.set.id;
            delete pForm.dados.set.nome;
            delete pForm.dados.set.nome_plano;

            return pForm;

          }

}]);
