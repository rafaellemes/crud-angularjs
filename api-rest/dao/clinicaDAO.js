  var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
  var Logger = getmodule("../api-rest/util/Logger");

  exports.id = function(params, callback){

    var query = "select * from clinica where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.ativos = function(params, callback){

    var query = "select * from clinica where ativo = 1";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.inativos = function(params, callback){

    var query = "select * from clinica where ativo = 0";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.cadastrar = function(params, callback){

    var query = "insert into clinica set ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.alterar = function(params, callback){

    var query = "update clinica set ? where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletar = function(params, callback){

    var query = "delete from clinica where ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.nomeFantasia = function(params, callback){

    var query = "select * from clinica where nome_fantasia like ?";

    DatabaseUtil.handlerConnection(query, "%"+ params + "%", callback);

  }

  exports.razaoSocial = function(params, callback){

    var query = "select * from clinica where razao_social like ?";

    DatabaseUtil.handlerConnection(query, "%"+ params + "%", callback);

  }

  exports.descricao = function(params, callback){

    var query = "select * from clinica where descricao like ?";

    DatabaseUtil.handlerConnection(query, "%"+ params + "%", callback);

  }


  exports.cnpj = function(params, callback){

    var query = "select * from clinica where cnpj = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.email = function(params, callback){

    var query = "select * from clinica where email like ?";

    DatabaseUtil.handlerConnection(query, "%"+ params + "%", callback);

  }

  exports.filtro = function(params, callback){

    var query = "select * from clinica where " + params + " order by id";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.medicos = function(params, callback){

    var query = "select p.* from pessoa p " +
                "inner join clinica_medicos cm " +
                "on p.id = cm.id_medico " +
                "where cm.id_clinica = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.cadastrarMedico = function(params, callback){

    var query = "insert into clinica_medicos set ? ";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletarMedico = function(params, callback){

    var query = "delete from clinica_medicos where ? ";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.clinicasPorConvenios = function(params, callback){

      var query = "select c.* from clinica c " +
     "inner join clinica_convenio cc " +
      "on c.id = cc.id_clinica " +
      "where cc.ativo = 1 and cc.id_convenio = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }
  
     //----- Convenio
    exports.convenios = function(params, callback){

      var query = "select cc.*, c.nome from clinica_convenio cc " +
     "inner join convenio c " +
      "on c.id = cc.id_convenio " +
      "where cc.ativo = 1 and cc.id_clinica = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }


    exports.inativarConvenioClinica = function(params, callback){

      var query = "update clinica_convenio set ativo = 0 where ? ";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.cadastrarConvenioClinica = function(params, callback){

      var query = "insert into clinica_convenio set ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.alterarConvenioClinica = function(params, callback){

      var query = "update clinica_convenio set ? where id = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }
