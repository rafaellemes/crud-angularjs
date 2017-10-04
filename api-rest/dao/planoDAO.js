var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
var Logger = getmodule("../api-rest/util/Logger");


  exports.id = function(params, callback){

    var query = "select * from plano where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.ativos = function(params, callback){

    var query = "select * from plano where ativo = 1";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.inativos = function(params, callback){

    var query = "select * from plano where ativo = 0";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.cadastrar = function(params, callback){

    var query = "insert into plano set ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.alterar = function(params, callback){

    var query = "update plano set ? where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletar = function(params, callback){

    var query = "delete from plano where ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.nome = function(params, callback){

    var query = "select * from plano where nome like ?";

    DatabaseUtil.handlerConnection(query, "%"+ params + "%", callback);

  }

  exports.descricao = function(params, callback){

    var query = "select * from plano where descricao like ?";

    DatabaseUtil.handlerConnection(query, "%"+ params + "%", callback);

  }

  exports.convenio = function(params, callback){

    var query = "select * from plano where id_convenio = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }



  exports.filtro = function(params, callback) {

      var query = "select * from plano where " + params + " order by nome";
    DatabaseUtil.handlerConnection(query, params, callback);

  }
