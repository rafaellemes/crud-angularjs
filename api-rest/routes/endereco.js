  var express = require('express');
  var App = express.Router();
  var Endereco = getmodule('../api-rest/api/endereco');
  var Auth = getmodule('../api-rest/util/auth');

  App.route('/')
    .all(Auth.auth)
    .post(Endereco.cadastrar)
    .put(Endereco.alterar)
    .delete(Endereco.deletar);

  App.route('/id/:id')
    .all(Auth.auth)
    .get(Endereco.id);

  App.route('/filtro')
    .all(Auth.auth)
    .post(Endereco.filtro);

  App.route('/cep/:cep')
    .all(Auth.auth)
    .get(Endereco.cep);

  App.route('/logradouro/:logradouro')
    .all(Auth.auth)
    .get(Endereco.logradouro);

  App.route('/bairro/:bairro')
    .all(Auth.auth)
    .get(Endereco.bairro);

  App.route('/cidade/:cidade')
    .all(Auth.auth)
    .get(Endereco.cidade);

  App.route('/estado/:estado')
    .all(Auth.auth)
    .get(Endereco.estado);


  App.route('/pessoa')
    .all(Auth.auth)
    .post(Endereco.cadastrarEnderecoPessoa)
    .put(Endereco.alterarEnderecoPessoa)
    .delete(Endereco.deletarEnderecoPessoa);

  App.route('/pessoa/:id_pessoa')
    .all(Auth.auth)
    .get(Endereco.consultarEnderecoPessoa);

  App.route('/clinica')
    .all(Auth.auth)
    .post(Endereco.cadastrarEnderecoClinica)
    .delete(Endereco.deletarEnderecoClinica);

  App.route('/clinica/:id_clinica')
    .all(Auth.auth)
    .get(Endereco.deletarEnderecoClinica);


  App.route('/convenio')
    .all(Auth.auth)
    .post(Endereco.cadastrarEnderecoConvenio)
    .delete(Endereco.deletarEnderecoConvenio);

  App.route('/convenio/:id_convenio')
    .all(Auth.auth)
    .get(Endereco.deletarEnderecoConvenio);

  App.route('/tipo')
    .all(Auth.auth)
    .get(Endereco.consultarTipoEndereco);

  App.route('/tipo/:id')
    .all(Auth.auth)
    .get(Endereco.consultarTipoEnderecoPorId);

  module.exports = App;
