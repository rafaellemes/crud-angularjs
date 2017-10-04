
var express = require('express');
var App = express.Router();
var Usuario = getmodule('../api-rest/api/usuario');
var Auth = getmodule('../api-rest/util/auth');




App.route('/')
  .all(Auth.auth)
  .get(Usuario.ativos)
  .post(Usuario.cadastrar)
  .put(Usuario.alterar)
  .delete(Usuario.deletar);


App.route('/login')
  .post(Usuario.login);

App.route('/logout')
  .all(Auth.auth)
  .get(Usuario.logout);

App.route('/ativos')
  .all(Auth.auth)
  .get(Usuario.ativos);

App.route('/inativos')
  .all(Auth.auth)
  .get(Usuario.inativos);

App.route('/consultar/login/:login')
  .all(Auth.auth)
  .get(Usuario.listarPorLogin);

App.route('/consultar/perfil/:perfil')
  .all(Auth.auth)
  .get(Usuario.listarPorPerfil);

  App.route('/filtro')
    .all(Auth.auth)
    .get(Usuario.filtro);

    App.route('/perfis')
      .all(Auth.auth)
      .get(Usuario.perfis);

module.exports = App;
