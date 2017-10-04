var express = require('express');
var App = express.Router();
var Clinica = getmodule('../api-rest/api/clinica');
var Auth = getmodule('../api-rest/util/auth');

App.route('/')
  .all(Auth.auth)
  .get(Clinica.ativos)
  .post(Clinica.cadastrar)
  .put(Clinica.alterar)
  .delete(Clinica.deletar);

App.route('/id/:id')
  .all(Auth.auth)
  .get(Clinica.id);

App.route('/nomefantasia/:nomeFantasia')
  .all(Auth.auth)
  .get(Clinica.nomeFantasia);

App.route('/razaosocial/:razaoSocial')
  .all(Auth.auth)
  .get(Clinica.razaoSocial);

App.route('/descricao/:descricao')
  .all(Auth.auth)
  .get(Clinica.descricao);



App.route('/cnpj/:cnpj')
  .all(Auth.auth)
  .get(Clinica.cnpj);

App.route('/email/:email')
  .all(Auth.auth)
  .get(Clinica.email);


App.route('/filtro')
  .all(Auth.auth)
  .get(Clinica.filtro);

App.route('/medicos/:id_clinica')
  .all(Auth.auth)
  .get(Clinica.medicos);

App.route('/medicos')
  .all(Auth.auth)
  .post(Clinica.cadastrarMedico)
  .delete(Clinica.deletarMedico);


 //Convenios
  App.route('/convenio/:id_convenio')
    .all(Auth.auth)
    .get(Clinica.clinicasPorConvenios);

 App.route('/convenios/:id_clinica')
    .all(Auth.auth)
    .get(Clinica.convenios);

    App.route('/convenios')
    .all(Auth.auth)
    .post(Clinica.cadastrarConvenioClinica)
    .put(Clinica.alterarConvenioClinica);

  App.route('/convenios/inativar')
    .all(Auth.auth)
    .put(Clinica.inativarClinica);

module.exports = App;
