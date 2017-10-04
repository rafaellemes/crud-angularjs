var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
var Logger = getmodule("../api-rest/util/Logger");

exports.id = function(params, callback){

  var query = "select * from pessoa where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.ativos = function(params, callback){

  var query = "select * from pessoa where ativo = 1 order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.inativos = function(params, callback){

  var query = "select * from pessoa where ativo = 0 order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.cadastrar = function(params, callback){

  var query = "insert into pessoa set ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.alterar = function(params, callback){

  var query = "update pessoa set ? where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.deletar = function(params, callback){

  var query = "delete from pessoa where ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.usuario = function(params, callback){

  var query = "select * from pessoa where id_usuario = ? order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.tipo = function(params, callback){

  var query = "select * from pessoa where id_tipo_pessoa = ? order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, params, callback);

}


exports.nome = function(params, callback){

  var query = "select * from pessoa where nome like ? order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, "%" +params + "%", callback);

}

exports.sobrenome = function(params, callback){

  var query = "select * from pessoa where sobrenome like ?";

  DatabaseUtil.handlerConnection(query, "%" +params + "%", callback);

}

exports.cpf = function(params, callback){

  var query = "select * from pessoa where cpf = ? order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.email = function(params, callback){

  var query = "select * from pessoa where email like ? order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, "%" +params + "%", callback);

}

exports.crm = function(params, callback){

  var query = "select * from pessoa where crm like ? order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, "%" +params + "%", callback);

}

exports.filtro = function(params, callback){

  var query = "select * from pessoa where " + params + " order by id, dt_cadastro";

  DatabaseUtil.handlerConnection(query, callback);

}
