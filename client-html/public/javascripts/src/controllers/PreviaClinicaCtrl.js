App.controller('PreviaClinicaCtrl', ['$scope', '$http', '$base64', '$window', 'Util', 'PreviaService', '$filter' ,

      function ($scope, $http, $base64, $window, Util, PreviaService, $filter) {

        $scope.formulario = {
            dados: {
                ativo: 1
            }
        };


        $scope.clinica = {
            dados: {}
        };

        $scope.listaPrevias = [];
        $scope.pacientes = [];
        $scope.pacienteSelecionado = {selected:""};
        $scope.convenios = [];
        $scope.convenioSelecionado = {selected:""};

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(2009,08,24),
            startingDay: 1,
            //formatDayTitle: 'yyyy/MM/dd hh:mm:ss'
        };

           $scope.modelOptions = {
            //dateDisabled: disabled,
            allowInvalid: false
               //,
              // timezone: "America/Sao Paulo"

        };

        $scope.dtInicioPicker = {
            opened: false
        };
        $scope.dtFimPicker = {
            opened: false
        };


        limparFormulario();


        init();

        function init() {

            var clinicaPrevia = sessionStorage.clinicaPrevia;


            //var clinica = {};
            if (clinicaPrevia && clinicaPrevia != "undefined") {
                var jFunc = JSON.parse($base64.decode(clinicaPrevia));
                $scope.clinica.dados = Util.copyJson(jFunc);

                listarConvenios($scope.clinica.dados.id);

            }



        }

        function listarPacientes(id_clinica) {
            PreviaService.listarPacientes(id_clinica)
                .success(function (pacientes) {
                    $scope.pacientes = pacientes;
                    //console.log($scope.pacientes);
                })
                .error(function (data, status, headers, config) {

                    console.log("deuRuim: " + JSON.stringify(data));

                });
        }

        function listarConvenios(id_clinica) {
            PreviaService.listarConvenios(id_clinica)
                .success(function (convenios) {
                    $scope.convenios = convenios;
                    listarPacientes(id_clinica);
                })
                .error(function (data, status, headers, config) {
                    console.log("deuRuim: " + JSON.stringify(data));
                    listarPacientes(id_clinica);
                });
        }

        function limparFormulario() {

            alterar = false;
            $scope.formulario = {
                dados: {
                    ativo: 1
                }
            };
             $scope.pacienteSelecionado = {selected:""};
             $scope.convenioSelecionado = {selected:""}

        }

        $scope.limparForm = limparFormulario;


        $scope.pesquisar = function () {

            if($scope.pacienteSelecionado.selected && $scope.pacienteSelecionado.selected.id){
                $scope.formulario.dados.id_pessoa = $scope.pacienteSelecionado.selected.id;
            }

            if($scope.convenioSelecionado.selected && $scope.convenioSelecionado.selected.id){
                $scope.formulario.dados.id_convenio = $scope.convenioSelecionado.selected.id;
            }
            if($scope.formulario.dados.dt_inicio){
                $scope.formulario.dados.dt_inicio = $filter('date')($scope.formulario.dados.dt_inicio, 'yyyy-MM-dd');
            }
            if($scope.formulario.dados.dt_fim){
                $scope.formulario.dados.dt_fim = $filter('date')($scope.formulario.dados.dt_fim, 'yyyy-MM-dd');
            }


            var filtro = getQueryParameters($scope.formulario.dados);

            //console.log(filtro);

            PreviaService.filtrar(filtro).success(function (previas) {
                    $scope.listaPrevias = previas;

                })
                .error(function (data, status, headers, config) {
                    $scope.listaClinicas = [];
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


        $scope.openDtInicio = function () {
            $scope.dtInicioPicker.opened = true;
        }
        $scope.openDtFim = function () {
            $scope.dtFimPicker.opened = true;
        }

        $scope.closeDtInicio = function () {
            $scope.dtInicioPicker.opened = false;
        }
        $scope.closeDtFim = function () {
            $scope.dtFimPicker.opened = false;
        }


        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
}]);
