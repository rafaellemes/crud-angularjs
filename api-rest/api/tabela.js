  var tabelaDAO = getmodule("../api-rest/dao/tabelaDAO");
  var msgUtil = getmodule("../api-rest/util/MessageUtil");
  var Constants = getmodule("../api-rest/util/Constants");
  var url = require('url');

  function handlerResult(res, tabelas, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(tabelas);
  }


  exports.ativos = function(req, res){

    tabelaDAO.ativos(null, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });

  };

  exports.inativos = function(req, res){

    tabelaDAO.inativos(null, function(tabelas, err){
        handlerResult(res, tabelas, err);

    });

  };

  exports.cadastrar = function(req, res){

    tabelaDAO.cadastrar(req.body.dados, function(tabelas, err){
      handlerResult(res, tabelas, err);

    });

  };

  exports.alterar = function(req, res){

    var params = [req.body.dados.set, req.body.dados.id];
    tabelaDAO.alterar(params, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });


  };

  exports.deletar = function(req, res){

    tabelaDAO.deletar(req.body.dados, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });

  };

  exports.id = function(req, res){

    tabelaDAO.id(req.params.id, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.codigoAmb = function(req, res){

    tabelaDAO.codigoAmb(req.params.codigo, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.codigoTus = function(req, res){

    tabelaDAO.codigoTus(req.params.codigo, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.descricao = function(req, res){

    tabelaDAO.descricao(req.params.descricao, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.quantidadeCh = function(req, res){

    tabelaDAO.quantidadeCh(req.params.quantidade, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.porte = function(req, res){

    tabelaDAO.porte(req.params.porte, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.porteCh = function(req, res){

    tabelaDAO.porteCh(req.params.porte, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.m2Filme = function(req, res){

    tabelaDAO.m2Filme(req.params.m2filme, function(tabelas, err){

      handlerResult(res, tabelas, err);

    });
  };

  exports.filtro = function(req, res){

    var parsedUrl = url.parse(req.url, true);

    if(!isEmpty(parsedUrl.query)){

    tabelaDAO.filtro(getQueryFilter(parsedUrl.query), function(tabelas, err){

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
      if(filter.qtd_ch){
        sql += " and qtd_ch =" + filter.qtd_ch;
      }
      if(filter.porte){
        sql += " and porte =" + filter.porte;
      }

      if(filter.porte_ch){
        sql += " and porte_ch =" + filter.porte_ch;
      }
      if(filter.m2_filme){
        sql += " and m2_filme =" + filter.m2_filme;
      }
      if(filter.ativo){
        sql += " and ativo =" + filter.ativo;
      }
      if(filter.numero){
        sql += " and numero =" + filter.numero;
      }
      if(filter.codigo_amb){
        sql += " and codigo_amb like '%" + filter.codigo_amb +"%'";
      }
      if(filter.codigo_tus){
        sql += " and codigo_tus like '%" + filter.codigo_tus +"%'";
      }
      if(filter.descricao){
        sql += " and descricao like '%" + filter.descricao +"%'";
      }


      console.log(sql)
    return sql;

  }
