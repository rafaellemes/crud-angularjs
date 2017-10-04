  var planoDAO = getmodule("../api-rest/dao/planoDAO");
  var msgUtil = getmodule("../api-rest/util/MessageUtil");
  var Constants = getmodule("../api-rest/util/Constants");
  var url = require('url');

  function handlerResult(res, planos, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(planos);
  }


  exports.ativos = function(req, res){

    planoDAO.ativos(null, function(planos, err){

      handlerResult(res, planos, err);

    });

  };

  exports.inativos = function(req, res){

    planoDAO.inativos(null, function(planos, err){
        handlerResult(res, planos, err);

    });

  };

  exports.cadastrar = function(req, res){

    planoDAO.cadastrar(req.body.dados, function(planos, err){
      handlerResult(res, planos, err);

    });

  };

  exports.alterar = function(req, res){

    var params = [req.body.dados.set, req.body.dados.id];
    planoDAO.alterar(params, function(planos, err){

      handlerResult(res, planos, err);

    });


  };

  exports.deletar = function(req, res){

    planoDAO.deletar(req.body.dados, function(planos, err){

      handlerResult(res, planos, err);

    });

  };

  exports.id = function(req, res){

    planoDAO.id(req.params.id, function(planos, err){

      handlerResult(res, planos, err);

    });
  };

  exports.nome = function(req, res){

    planoDAO.nome(req.params.nome, function(planos, err){

      handlerResult(res, planos, err);

    });
  };

  exports.descricao = function(req, res){

    planoDAO.descricao(req.params.descricao, function(planos, err){

      handlerResult(res, planos, err);

    });
  };

  exports.convenio = function(req, res){

    planoDAO.convenio(req.params.id_convenio, function(planos, err){

      handlerResult(res, planos, err);

    });
  };

  exports.filtro = function(req, res){

    var parsedUrl = url.parse(req.url, true);

    if(!isEmpty(parsedUrl.query)){

    planoDAO.filtro(getQueryFilter(parsedUrl.query), function(planos, err){

      handlerResult(res, planos, err);

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
      if(filter.id_convenio){
        sql += " and id_convenio =" + filter.id_convenio;
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
