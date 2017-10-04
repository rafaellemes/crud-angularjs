  var express = require('express');
  var App = express.Router();
  var Plano = getmodule('../api-rest/api/plano');
  var Auth = getmodule('../api-rest/util/auth');

  App.route('/')
    .all(Auth.auth)
    .get(Plano.ativos)
    .post(Plano.cadastrar)
    .put(Plano.alterar)
    .delete(Plano.deletar);

  App.route('/id/:id')
    .all(Auth.auth)
    .get(Plano.id);

  App.route('/nome/:nome')
    .all(Auth.auth)
    .get(Plano.nome);

  App.route('/descricao/:descricao')
    .all(Auth.auth)
    .get(Plano.descricao);

  App.route('/convenio/:id_convenio')
    .all(Auth.auth)
    .get(Plano.convenio);

  App.route('/filtro')
    .all(Auth.auth)
    .get(Plano.filtro);


  module.exports = App;
