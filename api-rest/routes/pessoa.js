var express = require('express');
var App = express.Router();
var Pessoa = getmodule('../api-rest/api/pessoa');
var Auth = getmodule('../api-rest/util/auth');

App.route('/')
  .all(Auth.auth)
  .get(Pessoa.ativos)
  .post(Pessoa.cadastrar)
  .put(Pessoa.alterar)
  .delete(Pessoa.deletar);

  App.route('/id/:id')
      .all(Auth.auth)
      .get(Pessoa.id);

App.route('/usuario/:usuario')
    .all(Auth.auth)
    .get(Pessoa.usuario);

App.route('/tipo/:tipo')
  .all(Auth.auth)
  .get(Pessoa.tipo);

  App.route('/nome/:nome')
    .all(Auth.auth)
    .get(Pessoa.nome);

  App.route('/sobrenome/:sobrenome')
      .all(Auth.auth)
      .get(Pessoa.sobrenome);

  App.route('/cpf/:cpf')
    .all(Auth.auth)
    .get(Pessoa.cpf);

  App.route('/email/:email')
    .all(Auth.auth)
    .get(Pessoa.email);

  App.route('/crm/:crm')
    .all(Auth.auth)
    .get(Pessoa.crm);

    App.route('/filtro')
      .all(Auth.auth)
      .get(Pessoa.filtro);

module.exports = App;
