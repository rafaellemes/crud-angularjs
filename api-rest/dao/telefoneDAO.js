var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
var Logger = getmodule("../api-rest/util/Logger");


exports.id = function(params, callback) {

  var query = "select * from telefone where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}


exports.cadastrar = function(params, callback) {

  var query = "insert into telefone set ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.alterar = function(params, callback) {

  var query = "update telefone set ? where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.deletar = function(params, callback) {

  var query = "delete from telefone where ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}


exports.filtro = function(params, callback) {

  var query = "select * from telefone where id_convenio = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}


exports.consultarTelefonePessoa = function(params, callback) {

  var query = "select tel.*, tipo.nome as tipo, tp.id as id_telefone_pessoa from telefone tel " +
    "inner join tipo_telefone tipo " +
    "on tel.id_tipo_telefone = tipo.id " +
    "inner join telefone_pessoa tp " +
    "on tel.id = tp.id_telefone " +
    "where tp.id_pessoa = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.cadastrarTelefonePessoa = function(params, callback) {

  var query = "insert into telefone_pessoa set ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.deletarTelefonePessoa = function(params, callback) {

  var query = "delete from telefone_pessoa where ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.consultarTelefoneClinica = function(params, callback) {

  var query = "select tel.*, tipo.nome as tipo from telefone tel " +
    "inner join tipo_telefone tipo" +
    "on tel.id_tipo_telefone = tipo.id " +
    "inner join telefone_clinica tc " +
    "on tel.id = tc.id_telefone " +
    "where tc.id_clinica = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.cadastrarTelefoneClinica = function(params, callback) {

  var query = "insert into telefone_clinica set ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.deletarTelefoneClinica = function(params, callback) {

  var query = "delete from telefone_clinica where ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.consultarTelefoneConvenio = function(params, callback) {

  var query = "select tel.*, tipo.nome as tipo from telefone tel " +
    "inner join tipo_telefone tipo" +
    "on tel.id_tipo_telefone = tipo.id " +
    "inner join telefone_convenio tc " +
    "on tel.id = tc.id_telefone " +
    "where tc.id_convenio = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.cadastrarTelefoneConvenio = function(params, callback) {

  var query = "insert into telefone_convenio set ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.deletarTelefoneConvenio = function(params, callback) {

  var query = "delete from telefone_convenio where ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.tipoTelefone = function(params, callback) {

  var query = "select * from tipo_telefone";

  DatabaseUtil.handlerConnection(query, params, callback);

}

exports.tipoTelefonePorId = function(params, callback) {

  var query = "select * from tipo_telefone where id = ?";

  DatabaseUtil.handlerConnection(query, params, callback);

}
