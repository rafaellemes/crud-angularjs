  var express = require('express');
  var App = express.Router();
  var Telefone = getmodule('../api-rest/api/telefone');
  var Auth = getmodule('../api-rest/util/auth');

  App.route('/')
    .all(Auth.auth)
    .post(Telefone.cadastrar)
    .put(Telefone.alterar)
    .delete(Telefone.deletar);

  App.route('/id/:id')
    .all(Auth.auth)
    .get(Telefone.id);

  App.route('/filtro')
    .all(Auth.auth)
    .post(Telefone.filtro);


  App.route('/tipo/')
    .all(Auth.auth)
    .get(Telefone.tipoTelefone);

  App.route('/tipo/:id')
    .all(Auth.auth)
    .get(Telefone.tipoTelefonePorId);

  App.route('/pessoa')
    .all(Auth.auth)
    .post(Telefone.cadastrarTelefonePessoa)
    .delete(Telefone.deletarTelefonePessoa);

  App.route('/pessoa/:id_pessoa')
    .all(Auth.auth)
    .get(Telefone.consultarTelefonePessoa);

  App.route('/clinica')
    .all(Auth.auth)
    .post(Telefone.cadastrarTelefoneClinica)
    .delete(Telefone.deletarTelefoneClinica);

  App.route('/clinica/:id_clinica')
    .all(Auth.auth)
    .get(Telefone.deletarTelefoneClinica);


  App.route('/convenio')
    .all(Auth.auth)
    .post(Telefone.cadastrarTelefoneConvenio)
    .delete(Telefone.deletarTelefoneConvenio);

  App.route('/convenio/:id_convenio')
    .all(Auth.auth)
    .get(Telefone.deletarTelefoneConvenio);

  module.exports = App;
