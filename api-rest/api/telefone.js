  var telefoneDAO = getmodule("../api-rest/dao/telefoneDAO");
  var msgUtil = getmodule("../api-rest/util/MessageUtil");
  var Constants = getmodule("../api-rest/util/Constants");
  var url = require('url');

  function handlerResult(res, telefones, err) {
    if (err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(telefones);
  }



  exports.cadastrar = function(req, res) {

    telefoneDAO.cadastrar(req.body.dados, function(telefones, err) {
      handlerResult(res, telefones, err);

    });

  };

  exports.alterar = function(req, res) {

    var params = [req.body.dados.set, req.body.dados.id];
    telefoneDAO.alterar(params, function(telefones, err) {

      handlerResult(res, telefones, err);

    });


  };

  exports.deletar = function(req, res) {

      telefoneDAO.deletar(req.body.dados, function(telefones, err) {

      handlerResult(res, telefones, err);

    });

  };

  exports.id = function(req, res) {

    telefoneDAO.id(req.params.id, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.filtro = function(req, res) {

    telefoneDAO.filtro(req.body.dados, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.tipoTelefone = function(req, res) {

    telefoneDAO.tipoTelefone(null, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.tipoTelefonePorId = function(req, res) {

    telefoneDAO.tipoTelefonePorId(req.params.id, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  // ---- PESSOA

  exports.consultarTelefonePessoa = function(req, res) {

    telefoneDAO.consultarTelefonePessoa(req.params.id_pessoa, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.cadastrarTelefonePessoa = function(req, res) {

    telefoneDAO.cadastrarTelefonePessoa(req.body.dados, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.deletarTelefonePessoa = function(req, res) {

    var parsedUrl = url.parse(req.url, true);
    var idTelPessoa = parsedUrl.query.tp;
    var idTelefone = parsedUrl.query.tel;
    var dadosTel = {id:idTelefone};
    var dadosTelPessoa = {id:idTelPessoa};


    telefoneDAO.deletarTelefonePessoa(dadosTelPessoa, function(telefones, err) {

      telefoneDAO.deletar(dadosTel,function(tels, err) {
        handlerResult(res, tels, err);
      });

    });
  };
  // ---- CLINICA
  exports.consultarTelefoneClinica = function(req, res) {

    telefoneDAO.consultarTelefoneClinica(req.params.id_clinica, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.cadastrarTelefoneClinica = function(req, res) {

    telefoneDAO.cadastrarTelefoneClinica(req.body.dados, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.deletarTelefoneClinica = function(req, res) {

    telefoneDAO.deletarTelefoneClinica(req.body.dados, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  // ---- CONVENIO
  exports.consultarTelefoneConvenio = function(req, res) {

    telefoneDAO.consultarTelefoneConvenio(req.params.id_convenio, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.cadastrarTelefoneConvenio = function(req, res) {

    telefoneDAO.cadastrarTelefoneConvenio(req.body.dados, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };

  exports.deletarTelefoneConvenio = function(req, res) {

    telefoneDAO.deletarTelefoneConvenio(req.body.dados, function(telefones, err) {

      handlerResult(res, telefones, err);

    });
  };
