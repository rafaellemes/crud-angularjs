var App = angular.module('mcr', ['ngSanitize', 'ngRoute', 'base64',
		'angularUtils.directives.dirPagination', 'ui.utils.masks', 'ngMask', 'ui.bootstrap', 'ui.select']);

App.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/dashboard.html',
		controller: 'DashController'
	})
	.when('/admin/funcionarios', {
		templateUrl: 'partials/admin/funcionarios.html',
		controller: 'FuncionarioCtrl'
	})
	.when('/admin/funcionarios/novo', {
		templateUrl: 'partials/admin/funcionarioIncluirAlterar.html',
		controller: 'FuncionarioIACtrl'
	})
	.when('/admin/funcionarios/alterar', {
		templateUrl: 'partials/admin/funcionarioIncluirAlterar.html',
		controller: 'FuncionarioIACtrl'
	})
	.when('/admin/pacientes', {
		templateUrl: 'partials/admin/pacientes.html',
		controller: 'PacientesCtrl'
	})
	.when('/admin/pacientes/novo', {
		templateUrl: 'partials/admin/pacienteIncluirAlterar.html',
		controller: 'PacienteIACtrl'
	})
	.when('/admin/pacientes/alterar', {
		templateUrl: 'partials/admin/pacienteIncluirAlterar.html',
		controller: 'PacienteIACtrl'
	})
	.when('/admin/medicos', {
		templateUrl: 'partials/admin/medicos.html',
		controller: 'MedicosCtrl'
	})
	.when('/admin/medicos/novo', {
		templateUrl: 'partials/admin/medicoIncluirAlterar.html',
		controller: 'MedicoIACtrl'
	})
	.when('/admin/medicos/alterar', {
		templateUrl: 'partials/admin/medicoIncluirAlterar.html',
		controller: 'MedicoIACtrl'
	})
	.when('/admin/tabelas', {
		templateUrl: 'partials/admin/tabelas.html',
		controller: 'TabelasCtrl'
	})
	.when('/admin/tabelas/novo', {
		templateUrl: 'partials/admin/tabelaIncluirAlterar.html',
		controller: 'TabelaIACtrl'
	})
	.when('/admin/tabelas/alterar', {
		templateUrl: 'partials/admin/tabelaIncluirAlterar.html',
		controller: 'TabelaIACtrl'
	})
	.when('/admin/convenios', {
		templateUrl: 'partials/admin/convenios.html',
		controller: 'ConveniosCtrl'
	})
	.when('/admin/convenios/novo', {
		templateUrl: 'partials/admin/convenioIncluirAlterar.html',
		controller: 'ConvenioIACtrl'
	})
	.when('/admin/convenios/alterar', {
		templateUrl: 'partials/admin/convenioIncluirAlterar.html',
		controller: 'ConvenioIACtrl'
	})
	.when('/admin/convenios/plano', {
		templateUrl: 'partials/admin/convenioPlanoIncluirAlterar.html',
		controller: 'ConvenioPlanoCtrl'
	})
	.when('/admin/planos', {
		templateUrl: 'partials/admin/planos.html',
		controller: 'PlanosCtrl'
	})
	.when('/admin/planos/novo', {
		templateUrl: 'partials/admin/planoIncluirAlterar.html',
		controller: 'PlanoIACtrl'
	})
	.when('/admin/planos/alterar', {
		templateUrl: 'partials/admin/planoIncluirAlterar.html',
		controller: 'PlanoIACtrl'
	})
	.when('/admin/usuarios', {
		templateUrl: 'partials/admin/usuarios.html',
		controller: 'UserCtrl'
	})
	.when('/admin/usuarios/novo', {
		templateUrl: 'partials/admin/usuarioIncluirAlterar.html',
		controller: 'UserIACtrl'
	})
	.when('/admin/usuarios/alterar', {
		templateUrl: 'partials/admin/usuarioIncluirAlterar.html',
		controller: 'UserIACtrl'
	})
	.when('/admin/clinicas', {
		templateUrl: 'partials/admin/clinicas.html',
		controller: 'ClinicasCtrl'
	})
	.when('/admin/clinicas/novo', {
		templateUrl: 'partials/admin/clinicaIncluirAlterar.html',
		controller: 'ClinicaIACtrl'
	})
	.when('/admin/clinicas/alterar', {
		templateUrl: 'partials/admin/clinicaIncluirAlterar.html',
		controller: 'ClinicaIACtrl'
	})
    .when('/previas', {
		templateUrl: 'partials/previa/previas.html',
		controller: 'PreviaCtrl'
	})
    .when('/previas/novo', {
		templateUrl: 'partials/previa/previaIncluirAlterar.html',
		controller: 'PreviaIACtrl'
	})
    .when('/previas/alterar', {
		templateUrl: 'partials/previa/previaIncluirAlterar.html',
		controller: 'PreviaIACtrl'
	})
     .when('/previas/clinica', {
		templateUrl: 'partials/previa/previasClinica.html',
		controller: 'PreviaClinicaCtrl'
	})
    .when('/previas/clinica/novo', {
		templateUrl: 'partials/previa/previaIncluirAlterar.html',
		controller: 'PreviaClinicaIACtrl'
	})
        .when('/previas/clinica/alterar', {
		templateUrl: 'partials/previa/previaIncluirAlterar.html',
		controller: 'PreviaClinicaIACtrl'
	})
    .when('/faturamentos', {
		templateUrl: 'partials/faturamento/faturamentos.html',
		controller: 'PreviaCtrl'
	}) 
    .when('/admin/calculos', {
		templateUrl: 'partials/admin/calculos.html',
		controller: 'PreviaCtrl'
	})
    .when('/admin/calculos/novo', {
		templateUrl: 'partials/admin/calculosIncluirAlterar.html',
		controller: 'ClinicaIACtrl'
	})
	.when('/admin/calculos/alterar', {
		templateUrl: 'partials/admin/calculosIncluirAlterar.html',
		controller: 'ClinicaIACtrl'
	})
	;

/*	.when('/create', {
		templateUrl: 'views/create.html',
		controller: 'CreateCtrl'
	})

	.when('/edit/:id', {
		templateUrl: 'views/edit.html',
		controller: 'EditCtrl'
	})*/

//	$locationProvider.html5Mode(true);
}]);

App.value('api', 'http://localhost:3000/');
//App.value('api', 'http://192.168.0.13:3000/');

App.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

