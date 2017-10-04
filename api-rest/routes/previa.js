var express = require('express');
var App = express.Router();
var Previa = getmodule('../api-rest/api/previa');
var Auth = getmodule('../api-rest/util/auth');


App.route('/id/:id')
    .all(Auth.auth)
    .get(Previa.id);

App.route("/clinica/pacientes/:id_clinica")
    .all(Auth.auth)
    .get(Previa.pacientes);

App.route("/clinica/convenios/:id_clinica")
    .all(Auth.auth)
    .get(Previa.convenios);

App.route('/tipos')
  .all(Auth.auth)
  .get(Previa.tipos);

App.route('/status')
  .all(Auth.auth)
  .get(Previa.status);

App.route('/filtro')
  .all(Auth.auth)
  .get(Previa.filtro);

module.exports = App;
