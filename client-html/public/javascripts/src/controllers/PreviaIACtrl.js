App.controller('PreviaIACtrl', ['$scope', '$http', '$base64', '$window', 'Util', 'PreviaService', 'PacienteService', 'ConvenioService', 'PlanoService', 'ClinicaService', '$filter' ,

      function ($scope, $http, $base64, $window, Util, PreviaService, PacienteService, ConvenioService, PlanoService, ClinicaService, $filter) {

          
          $scope.previa = {dados: {ativo:1}};
          $scope.paciente = {dados: {ativo:1}};
          $scope.plano = {dados: {ativo:1}};
          $scope.clinica = {dados: {ativo:1}};
          
          $scope.tiposPrevia = []; 
          $scope.statusPrevia = []; 
          $scope.listaPacientesAtivos = [];
          $scope.listaConvenios = [];
          $scope.listaClinicasAtivos = [];
          
          init();
          
          
          function init(){
              listarPacientes();
          }
          
          function listarPacientes(){
              
              PacienteService.listarAtivos().success(function(pacs){
                 //console.log(previas);
                    $scope.listaPacientesAtivos = pacs;

                })
                .error(function(data, status, headers, config){
                  //console.log("deuRuim: " + JSON.stringify(data));
                  //Info Msg de que não há registro para pesquisa
                  $scope.tiposPrevia = [];
                })
              .finally(function() {
                  listarTiposPrevias();
              });
              
              
          }
          
          function listarTiposPrevias(){
              
              PreviaService.listarTipos().success(function(tipos){
                 //console.log(previas);
                    $scope.tiposPrevia = tipos;

                })
                .error(function(data, status, headers, config){
                  //console.log("deuRuim: " + JSON.stringify(data));
                  //Info Msg de que não há registro para pesquisa
                  $scope.tiposPrevia = [];
                })
              .finally(function() {
                  listarTiposStatus();
              });
              
              
          }
          
           function listarTiposStatus(){
              
              PreviaService.listarStatus().success(function(status){
                 //console.log(previas);
                    $scope.statusPrevia = status;

                })
                .error(function(data, status, headers, config){
                  //console.log("deuRuim: " + JSON.stringify(data));
                  //Info Msg de que não há registro para pesquisa
                  $scope.statusPrevia = [];
                })
              .finally(function() {
                  
              });
              
              
          }
          
          $scope.selecionarPaciente = function(paciente){
             
              $scope.paciente.dados = paciente;
               console.log( $scope.paciente);
              listarConveniosPaciente($scope.paciente.dados.id);
              
          }
          
          
          function listarConveniosPaciente(id_paciente){
              
              ConvenioService.listarConveniosPaciente(id_paciente).success(function(convenios){
                  
                    $scope.listaConvenios = convenios;
                  // console.log($scope.listaConvenios.length);
                  if($scope.listaConvenios.length === 1){
                      var conv_paci = $scope.listaConvenios[0];
                      $scope.previa.dados.id_convenio = conv_paci.id_convenio;
                       //TODO carregar o Plano do Paciente
                      console.log(conv_paci);
                     carregarPlano(conv_paci.id_plano)
                   
                  }
                  
                  

                })
                .error(function(data, status, headers, config){
                  console.log("deuRuim: " + JSON.stringify(data));
                  //Info Msg de que não há registro para pesquisa
                  $scope.listaConvenios = [];
                });
             
          }
          
          function carregarPlano(id_plano){
               PlanoService.findById(id_plano).success(function(planos){
                  if(planos.length > 0){
                    $scope.plano.dados = planos[0];
                      
                  }
                  
                })
                .error(function(data, status, headers, config){
                  console.log("deuRuim: " + JSON.stringify(data));
                  //Info Msg de que não há registro para pesquisa
                   $scope.plano.dados={ativo:1};
                }) .finally(function() {
                  //TODO carregar o Plano do Paciente
                  listarClinicasPorConvenios($scope.previa.dados.id_convenio);
              });
          }
          
          function listarClinicasPorConvenios(id_convenio){
              
              console.log("id_convenio");
                 console.log(id_convenio);
             ClinicaService.listarClinicasPorConvenio(id_convenio).success(function(clinicas){
                 console.log("clinicas");
                 console.log(clinicas);
                   $scope.listaClinicasAtivos = clinicas;
                })
                .error(function(data, status, headers, config){
                  console.log("deuRuim: " + JSON.stringify(data));
                  //Info Msg de que não há registro para pesquisa
                   $scope.listaClinicasAtivos = [];
                });
              
          }
          
          $scope.selecionarClinica = function(clinica){
              $scope.clinica.dados = clinica;
          }

      }]);
