  var enderecoDAO = getmodule("../api-rest/dao/enderecoDAO");
  var msgUtil = getmodule("../api-rest/util/MessageUtil");
  var Constants = getmodule("../api-rest/util/Constants");
  var url = require('url');

  function handlerResult(res, enderecos, err) {
    if (err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(enderecos);
  }



  exports.cadastrar = function(req, res) {

    enderecoDAO.cadastrar(req.body.dados, function(enderecos, err) {
      handlerResult(res, enderecos, err);

    });

  };

  exports.alterar = function(req, res) {

    var params = [req.body.dados.set, req.body.dados.id];
    enderecoDAO.alterar(params, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });


  };

  exports.deletar = function(req, res) {

    enderecoDAO.deletar(req.body.dados, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });

  };

  exports.id = function(req, res) {

    enderecoDAO.id(req.params.id, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.filtro = function(req, res) {

    enderecoDAO.filtro(req.body.dados, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };


  exports.cep = function(req, res) {

    enderecoDAO.cep(req.params.cep, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.logradouro = function(req, res) {

    enderecoDAO.logradouro(req.params.logradouro, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };


  exports.bairro = function(req, res) {

    enderecoDAO.bairro(req.params.bairro, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.cidade = function(req, res) {

    enderecoDAO.cidade(req.params.cidade, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.estado = function(req, res) {

    enderecoDAO.estado(req.params.estado, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  // ---- PESSOA

  exports.consultarEnderecoPessoa = function(req, res) {

    enderecoDAO.consultarEnderecoPessoa(req.params.id_pessoa, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.alterarEnderecoPessoa = function(req, res) {

      var params = [req.body.dados.set, req.body.dados.id];
    enderecoDAO.alterarEnderecoPessoa(params, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.cadastrarEnderecoPessoa = function(req, res) {

    enderecoDAO.cadastrarEnderecoPessoa(req.body.dados, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.deletarEnderecoPessoa = function(req, res) {

    var parsedUrl = url.parse(req.url, true);
    var idEndPessoa ={id:parsedUrl.query.id};

    enderecoDAO.deletarEnderecoPessoa(idEndPessoa, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };
  // ---- CLINICA
  exports.consultarEnderecoClinica = function(req, res) {

    enderecoDAO.consultarEnderecoClinica(req.params.id_clinica, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.cadastrarEnderecoClinica = function(req, res) {

    enderecoDAO.cadastrarEnderecoClinica(req.body.dados, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.deletarEnderecoClinica = function(req, res) {

    var parsedUrl = url.parse(req.url, true);
    var idEndClinica ={id:parsedUrl.query.id};

    enderecoDAO.deletarEnderecoClinica(idEndClinica, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  // ---- CONVENIO
  exports.consultarEnderecoConvenio = function(req, res) {

    enderecoDAO.consultarEnderecoConvenio(req.params.id_convenio, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.cadastrarEnderecoConvenio = function(req, res) {

    enderecoDAO.cadastrarEnderecoConvenio(req.body.dados, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.deletarEnderecoConvenio = function(req, res) {


    var parsedUrl = url.parse(req.url, true);
    var idEndConvenio ={id:parsedUrl.query.id};

    enderecoDAO.deletarEnderecoConvenio(idEndConvenio, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };


  exports.consultarTipoEndereco = function(req, res) {

    enderecoDAO.consultarTipoEndereco(null, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };

  exports.consultarTipoEnderecoPorId = function(req, res) {

    enderecoDAO.consultarTipoEnderecoPorId(req.params.id, function(enderecos, err) {

      handlerResult(res, enderecos, err);

    });
  };
