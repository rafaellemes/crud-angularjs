var express = require('express');
var App = express.Router();
var Tabela = getmodule('../api-rest/api/tabela');
var Auth = getmodule('../api-rest/util/auth');

App.route('/')
    .all(Auth.auth)
    .get(Tabela.ativos)
    .post(Tabela.cadastrar)
    .put(Tabela.alterar)
    .delete(Tabela.deletar);

App.route('/id/:id')
    .all(Auth.auth)
    .get(Tabela.id);

App.route('/amb/:codigo')
    .all(Auth.auth)
    .get(Tabela.codigoAmb);

App.route('/tus/:codigo')
    .all(Auth.auth)
    .get(Tabela.codigoTus);

App.route('/descricao/:descricao')
    .all(Auth.auth)
    .get(Tabela.descricao);

App.route('/ch/:quantidade')
    .all(Auth.auth)
    .get(Tabela.quantidadeCh);

App.route('/porte/:porte')
    .all(Auth.auth)
    .get(Tabela.porte);

App.route('/porte/ch/:porte')
    .all(Auth.auth)
    .get(Tabela.porteCh);

App.route('/m2filme/:m2filme')
    .all(Auth.auth)
    .get(Tabela.porteCh);

App.route('/filtro')
    .all(Auth.auth)
    .get(Tabela.filtro);

module.exports = App;
