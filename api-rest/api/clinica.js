  var clinicaDAO = getmodule("../api-rest/dao/clinicaDAO");
  var msgUtil = getmodule("../api-rest/util/MessageUtil");
  var Constants = getmodule("../api-rest/util/Constants");
  var url = require('url');

  function handlerResult(res, clinicas, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(clinicas);
  }


  exports.ativos = function(req, res){

    clinicaDAO.ativos(null, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });

  };

  exports.inativos = function(req, res){

    clinicaDAO.inativos(null, function(clinicas, err){
        handlerResult(res, clinicas, err);

    });

  };

  exports.cadastrar = function(req, res){

    clinicaDAO.cadastrar(req.body.dados, function(clinicas, err){
      handlerResult(res, clinicas, err);

    });

  };

  exports.alterar = function(req, res){

    var params = [req.body.dados.set, req.body.dados.id];
    clinicaDAO.alterar(params, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });


  };

  exports.deletar = function(req, res){

    clinicaDAO.deletar(req.body.dados, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });

  };

  exports.id = function(req, res){

    clinicaDAO.id(req.params.id, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  exports.nomeFantasia = function(req, res){

    clinicaDAO.nomeFantasia(req.params.nomeFantasia, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  exports.razaoSocial = function(req, res){

    clinicaDAO.razaoSocial(req.params.razaoSocial, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  exports.descricao = function(req, res){

    clinicaDAO.descricao(req.params.descricao, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  exports.cnpj = function(req, res){

    clinicaDAO.cnpj(req.params.cnpj, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  exports.email = function(req, res){

    clinicaDAO.email(req.params.email, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };


  exports.medicos = function(req, res){
    console.log(req.params.id_clinica);
    clinicaDAO.medicos(req.params.id_clinica, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  exports.cadastrarMedico = function(req, res){

    clinicaDAO.cadastrarMedico(req.body.dados, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  exports.deletarMedico = function(req, res){

    clinicaDAO.deletarMedico(req.body.dados, function(clinicas, err){

      handlerResult(res, clinicas, err);

    });
  };

  //-- Convenios

    exports.clinicasPorConvenios = function(req, res){
      clinicaDAO.clinicasPorConvenios(req.params.id_convenio, function(clinicas, err){

        handlerResult(res, clinicas, err);

      });
    };
    exports.convenios = function(req, res){
      clinicaDAO.convenios(req.params.id_clinica, function(convenios, err){

        handlerResult(res, convenios, err);

      });
    };

    exports.alterarConvenioClinica = function(req, res){

        var params = [req.body.dados.set, req.body.dados.id];

      clinicaDAO.alterarConvenioClinica(params, function(convenios, err){

        handlerResult(res, convenios, err);

      });
    };

    exports.cadastrarConvenioClinica = function(req, res){

      clinicaDAO.cadastrarConvenioClinica(req.body.dados, function(convenios, err){
        handlerResult(res, convenios, err);

      });

    };
    exports.inativarClinica = function(req, res){

      clinicaDAO.inativarConvenioClinica(req.body.dados, function(convenios, err){
        handlerResult(res, convenios, err);

      });

    };


    exports.filtro = function(req, res){

      var parsedUrl = url.parse(req.url, true);

      if(!isEmpty(parsedUrl.query)){

      clinicaDAO.filtro(getQueryFilter(parsedUrl.query), function(tabelas, err){

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

          if(filter.nome_fantasia){
            sql += " and nome_fantasia like '%" + filter.nome_fantasia +"%'";
          }
          if(filter.razao_social){
            sql += " and razao_social like '%" + filter.razao_social   +"%'";
          }

          if(filter.cnpj){
            sql += " and cnpj like '%" + filter.cnpj   +"%'";
          }

          if(filter.descricao){
            sql += " and descricao like '%" + filter.descricao +"%'";
          }

          console.log(sql)
        return sql;

      }
