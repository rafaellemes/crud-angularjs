var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
var Logger = getmodule("../api-rest/util/Logger");


  exports.id = function(params, callback){

    var query = "select * from convenio where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.ativos = function(params, callback){

    var query = "select * from convenio where ativo = 1";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.inativos = function(params, callback){

    var query = "select * from convenio where ativo = 0";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.cadastrar = function(params, callback){

    var query = "insert into convenio set ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.alterar = function(params, callback){

    var query = "update convenio set ? where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletar = function(params, callback){

    var query = "delete from convenio where ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.nome = function(params, callback){

    var query = "select * from convenio where nome like ?";

    DatabaseUtil.handlerConnection(query, "%"+ params + "%", callback);

  }


    exports.tabelas = function(params, callback){

      var query = "select pp.*, p.codigo_amb, p.descricao from convenio_plano_tabela pp "+
      "inner join tabelas p "+
      "on p.id = pp.id_tabela " +
      "where pp.ativo = 1 and pp.id_convenio_plano = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.tabelasNaoAssociados = function(params, callback){

      var query = "select p.* from tabelas p "+
      "where p.id not in ( " +
      "select pp.id_tabela from convenio_plano_tabela pp " +
      "where pp.ativo = 1 and pp.id_convenio_plano = ?)";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.inativarTabela = function(params, callback){

      var query = "update convenio_plano_tabela set ativo = 0 where ? ";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.cadastrarConvenioTabela = function(params, callback){
      
      var query = "insert into convenio_plano_tabela set ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.alterarConvenioTabela = function(params, callback){

      var query = "update convenio_plano_tabela set ? where id = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    //----- PLANOS
    exports.planos = function(params, callback){

      var query = "select pp.*, p.nome, p.descricao from convenio_plano pp "+
      "inner join plano p "+
      "on p.id = pp.id_plano " +
      "where pp.ativo = 1 and pp.id_convenio = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }


    exports.inativarPlano = function(params, callback){

      var query = "update convenio_plano set ativo = 0 where ? ";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.cadastrarConvenioPlano = function(params, callback){

      var query = "insert into convenio_plano set ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.alterarConvenioPlano = function(params, callback){

      var query = "update convenio_plano set ? where id = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }



    //--PACIENTES

    exports.conveniosPaciente = function (params, callback) {

        var query = "select cp.*, c.nome, p.nome as nome_plano from convenio_paciente cp " +
            "inner join convenio c " +
            "on c.id = cp.id_convenio " +
            "inner join plano p " +
            "on p.id = cp.id_plano " +
            "where cp.ativo = 1 and cp.id_pessoa = ?";

        DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.pacientes = function (params, callback) {

        var query = "select pp.*, p.nome from convenio_paciente pp " +
            "inner join pessoa p " +
            "on p.id = pp.id_pessoa " +
            "where pp.ativo = 1 and pp.id_convenio = ?";

        DatabaseUtil.handlerConnection(query, params, callback);

    }


    exports.inativarPaciente = function(params, callback){

      var query = "update convenio_paciente set ativo = 0 where ? ";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.cadastrarConvenioPaciente = function(params, callback){

      var query = "insert into convenio_paciente set ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }

    exports.alterarConvenioPaciente = function(params, callback){

      var query = "update convenio_paciente set ? where id = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

    }


  exports.filtro = function(params, callback) {

      var query = "select * from convenio where " + params + " order by id";

    DatabaseUtil.handlerConnection(query, params, callback);

  }
