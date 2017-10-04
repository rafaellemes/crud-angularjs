  var express = require('express');

  var users = require("../routes/users");
  var pessoa = require("../routes/pessoa");
  var clinica = require("../routes/clinica");
  var convenio = require("../routes/convenio");
  var plano = require("../routes/plano");
  var tabela = require("../routes/tabela");
  var telefone = require("../routes/telefone");
  var endereco = require("../routes/endereco");
  var previa = require("../routes/previa");

  var app = express();

  app.use('/users', users);
  app.use('/pessoa', pessoa);
  app.use('/clinica', clinica);
  app.use('/convenio', convenio);
  app.use('/plano', plano);
  app.use('/tabela', tabela);
  app.use('/telefone', telefone);
  app.use('/endereco', endereco);
  app.use('/previa', previa);

  module.exports = app;
