  var convenioDAO = getmodule("../api-rest/dao/convenioDAO");
  var msgUtil = getmodule("../api-rest/util/MessageUtil");
  var Constants = getmodule("../api-rest/util/Constants");
  var url = require('url');

  function handlerResult(res, convenios, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(convenios);
  }


  exports.ativos = function(req, res){

    convenioDAO.ativos(null, function(convenios, err){

      handlerResult(res, convenios, err);

    });

  };

  exports.inativos = function(req, res){

    convenioDAO.inativos(null, function(convenios, err){
        handlerResult(res, convenios, err);

    });

  };

  exports.cadastrar = function(req, res){

    convenioDAO.cadastrar(req.body.dados, function(convenios, err){
      handlerResult(res, convenios, err);

    });

  };

  exports.alterar = function(req, res){

    var params = [req.body.dados.set, req.body.dados.id];
    convenioDAO.alterar(params, function(convenios, err){

      handlerResult(res, convenios, err);

    });


  };

  exports.deletar = function(req, res){

    convenioDAO.deletar(req.body.dados, function(convenios, err){

      handlerResult(res, convenios, err);

    });

  };

  exports.id = function(req, res){

    convenioDAO.id(req.params.id, function(convenios, err){

      handlerResult(res, convenios, err);

    });
  };

  exports.nome = function(req, res){

    convenioDAO.nome(req.params.nome, function(convenios, err){

      handlerResult(res, convenios, err);

    });
  };


    exports.tabelas = function(req, res){


      convenioDAO.tabelas(req.params.id_convenio, function(planos, err){

        handlerResult(res, planos, err);

      });
    };

    exports.tabelasNaoAssociados = function(req, res){
        convenioDAO.tabelasNaoAssociados(req.params.id_convenio, function(planos, err){

        handlerResult(res, planos, err);

      });
    };

    exports.cadastrarConvenioTabela = function(req, res){
      console.log(req.body.dados);
      convenioDAO.cadastrarConvenioTabela(req.body.dados, function(planos, err){
        handlerResult(res, planos, err);

      });

    };

    exports.alterarConvenioTabela = function(req, res){
        var params = [req.body.dados.set, req.body.dados.id];
      convenioDAO.alterarConvenioTabela(params, function(planos, err){
        handlerResult(res, planos, err);

      });

    };

    exports.inativarTabela = function(req, res){

      convenioDAO.inativarTabela(req.body.dados, function(planos, err){
        handlerResult(res, planos, err);

      });

    };

    //-- PLANOS

    exports.planos = function(req, res){


      convenioDAO.planos(req.params.id_convenio, function(planos, err){

        handlerResult(res, planos, err);

      });
    };

    exports.alterarConvenioPlano = function(req, res){

        var params = [req.body.dados.set, req.body.dados.id];

      convenioDAO.alterarConvenioPlano(params, function(planos, err){

        handlerResult(res, planos, err);

      });
    };

    exports.cadastrarConvenioPlano = function(req, res){

      convenioDAO.cadastrarConvenioPlano(req.body.dados, function(planos, err){
        handlerResult(res, planos, err);

      });

    };
    exports.inativarPlano = function(req, res){

      convenioDAO.inativarPlano(req.body.dados, function(planos, err){
        handlerResult(res, planos, err);

      });

    };



  //-- PACIENTES

    exports.conveniosPaciente = function(req, res){


      convenioDAO.conveniosPaciente(req.params.id_pessoa, function(pacientes, err){

        handlerResult(res, pacientes, err);

      });
    };

    exports.pacientes = function(req, res){


      convenioDAO.pacientes(req.params.id_convenio, function(pacientes, err){

        handlerResult(res, pacientes, err);

      });
    };

    exports.alterarConvenioPaciente = function(req, res){

        var params = [req.body.dados.set, req.body.dados.id];

      convenioDAO.alterarConvenioPaciente(params, function(pacientes, err){

        handlerResult(res, pacientes, err);

      });
    };

    exports.cadastrarConvenioPaciente = function(req, res){

      convenioDAO.cadastrarConvenioPaciente(req.body.dados, function(pacientes, err){
        handlerResult(res, pacientes, err);

      });

    };
    exports.inativarPaciente = function(req, res){

      convenioDAO.inativarPaciente(req.body.dados, function(pacientes, err){
        handlerResult(res, pacientes, err);

      });

    };


  exports.filtro = function(req, res){

    var parsedUrl = url.parse(req.url, true);

    if(!isEmpty(parsedUrl.query)){

    convenioDAO.filtro(getQueryFilter(parsedUrl.query), function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  }else{
    msgUtil.showError(res, Constants.errorMessage.noParamatersFilter);
  }

  };

  var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
  }

  function getQueryFilter(filter){

      var sql = "1 = 1 ";

      if(filter.id){
        sql += " and id = " + filter.id;
      }

      if(filter.ativo){
        sql += " and ativo =" + filter.ativo;
      }

      if(filter.nome){
        sql += " and nome like '%" + filter.nome +"%'";
      }
      if(filter.descricao){
        sql += " and descricao like '%" + filter.descricao +"%'";
      }

      console.log(sql)
    return sql;

  }
