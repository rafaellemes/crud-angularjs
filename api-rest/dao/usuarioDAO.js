var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
var Constants = getmodule("../api-rest/util/Constants");
var log = getmodule("../api-rest/util/Logger");



exports.login = function(params, callback){

  var query = "select * from usuario where login = ? and senha = ? and ativo = 1";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.perfis = function(params, callback){

  var query = "select * from perfil order by id";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.listarAtivos = function(params, callback){

  var query = "select * from usuario where ativo = 1";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.listarInativos = function(params, callback){

  var query = "select * from usuario where ativo = 0";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.listarPorLogin = function(params, callback){

  var query = "select * from usuario where login like ?";

  DatabaseUtil.handlerConnection(query, "%"+params+"%", callback);

}


exports.listarPorPerfil = function(params, callback){

  var query = "select * from usuario where id_perfil = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.cadastrar = function(params, callback){

  var query = "insert into usuario set ?";

  DatabaseUtil.handlerConnection(query, params, callback);

};

exports.alterar = function(params, callback){

  var query = "update usuario set ? where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

};

exports.deletar = function(params, callback){

  var query = "delete from usuario where ?";

  DatabaseUtil.handlerConnection(query, params, callback);

};


exports.filtro = function(params, callback) {

    var query = "select * from usuario where " + params + " order by login, id_perfil";
    DatabaseUtil.handlerConnection(query, params, callback);

}
