  var express = require('express');
  var App = express.Router();
  var Convenio = getmodule('../api-rest/api/convenio');
  var Auth = getmodule('../api-rest/util/auth');

  App.route('/')
    .all(Auth.auth)
    .get(Convenio.ativos)
    .post(Convenio.cadastrar)
    .put(Convenio.alterar)
    .delete(Convenio.deletar);

  App.route('/id/:id')
    .all(Auth.auth)
    .get(Convenio.id);

  App.route('/nome/:nome')
    .all(Auth.auth)
    .get(Convenio.nome);


  App.route('/tabelas/:id_convenio')
    .all(Auth.auth)
    .get(Convenio.tabelas);

  App.route('/tabelas/nao/:id_convenio')
    .all(Auth.auth)
    .get(Convenio.tabelasNaoAssociados);


  App.route('/tabelas')
    .all(Auth.auth)
    .post(Convenio.cadastrarConvenioTabela)
    .put(Convenio.alterarConvenioTabela);

  App.route('/tabelas/inativar')
    .all(Auth.auth)
    .put(Convenio.inativarTabela);

  //PLANOS
  App.route('/planos/:id_convenio')
    .all(Auth.auth)
    .get(Convenio.planos);


  App.route('/planos')
    .all(Auth.auth)
    .post(Convenio.cadastrarConvenioPlano)
    .put(Convenio.alterarConvenioPlano);

  App.route('/planos/inativar')
    .all(Auth.auth)
    .put(Convenio.inativarPlano);


  App.route('/filtro')
    .all(Auth.auth)
    .get(Convenio.filtro);

    //PACIENTES
  App.route('/paciente/:id_pessoa')
    .all(Auth.auth)
    .get(Convenio.conveniosPaciente);

  App.route('/pacientes/:id_convenio')
    .all(Auth.auth)
    .get(Convenio.pacientes);


  App.route('/pacientes')
    .all(Auth.auth)
    .post(Convenio.cadastrarConvenioPaciente)
    .put(Convenio.alterarConvenioPaciente);

  App.route('/pacientes/inativar')
    .all(Auth.auth)
    .put(Convenio.inativarPaciente);

  App.route('/filtro')
    .all(Auth.auth)
    .get(Convenio.filtro);


  module.exports = App;
