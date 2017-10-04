var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
var Logger = getmodule("../api-rest/util/Logger");


exports.id = function(params, callback) {

  var query = "select * from tabelas where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.ativos = function(params, callback) {

  var query = "select * from tabelas where ativo = 1";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.inativos = function(params, callback) {

  var query = "select * from tabelas where ativo = 0";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.cadastrar = function(params, callback) {

  var query = "insert into tabelas set ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.alterar = function(params, callback) {

  var query = "update tabelas set ? where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.deletar = function(params, callback) {

  var query = "delete from tabelas where ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.codigoAmb = function(params, callback) {

  var query = "select * from tabelas where codigo_amb like ?";

  DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

}

exports.codigoTus = function(params, callback) {

  var query = "select * from tabelas where codigo_tus like ?";

  DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

}

exports.descricao = function(params, callback) {

  var query = "select * from tabelas where descricao like ?";

  DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

}

exports.quantidadeCh = function(params, callback) {

  var query = "select * from tabelas where qtd_ch = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.porte = function(params, callback) {

  var query = "select * from tabelas where porte = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.porteCh = function(params, callback) {

  var query = "select * from tabelas where porte_ch = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.m2Filme = function(params, callback) {

  var query = "select * from tabelas where m2_filme = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.filtro = function(params, callback) {

    var query = "select * from tabelas where " + params + " order by id";

  DatabaseUtil.handlerConnection(query, params, callback);

}
