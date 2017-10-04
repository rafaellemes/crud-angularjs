  var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
  var Logger = getmodule("../api-rest/util/Logger");


  exports.id = function(params, callback) {

    var query = "select * from endereco where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }


  exports.cadastrar = function(params, callback) {

    var query = "insert into endereco set ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.alterar = function(params, callback) {

    var query = "update endereco set ? where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletar = function(params, callback) {

    var query = "delete from endereco where ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }


  exports.filtro = function(params, callback) {

    var query = "select * from endereco where id_convenio = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }



  exports.cep = function(params, callback) {

    var query = "select * from endereco where cep like ?";

    DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

  }


  exports.logradouro = function(params, callback) {

    var query = "select * from endereco where logradouro like ?";

    DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

  }

  exports.bairro = function(params, callback) {

    var query = "select * from endereco where bairro like ?";

    DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

  }

  exports.cidade = function(params, callback) {

    var query = "select * from endereco where cidade like ?";

    DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

  }

  exports.estado = function(params, callback) {

    var query = "select * from endereco where estado like ?";

    DatabaseUtil.handlerConnection(query, "%" + params + "%", callback);

  }

  exports.consultarEnderecoPessoa = function(params, callback) {

    var query = "select end.*, ep.numero, ep.complemento, te.nome as tipo, "+
      "ep.id as id_endereco_pessoa, ep.id_pessoa, ep.id_tipo_endereco " +
      "from endereco end " +
      "inner join endereco_pessoa ep " +
      "on end.id = ep.id_endereco " +
      "inner join tipo_endereco te " +
      "on te.id = ep.id_tipo_endereco " +
      "where ep.id_pessoa = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.alterarEnderecoPessoa = function(params, callback) {

    var query = "update endereco_pessoa set ? where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.cadastrarEnderecoPessoa = function(params, callback) {

    var query = "insert into endereco_pessoa set ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletarEnderecoPessoa = function(params, callback) {

    var query = "delete from endereco_pessoa where ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.consultarEnderecoClinica = function(params, callback) {

    var query = "select end.*, ec.numero, ec.complemento from endereco end " +
      "inner join endereco_clinica ec " +
      "on end.id = ec.id_endereco " +
      "where ec.id_clinica = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.cadastrarEnderecoClinica = function(params, callback) {

    var query = "insert into endereco_clinica set ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletarEnderecoClinica = function(params, callback) {

    var query = "delete from endereco_clinica where ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.consultarEnderecoConvenio = function(params, callback) {

    var query = "select end.*, ec.numero, ec.complemento from endereco end " +
      "inner join endereco_convenio ec " +
      "on end.id = ec.id_endereco " +
      "where ec.id_convenio = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.cadastrarEnderecoConvenio = function(params, callback) {

    var query = "insert into endereco_convenio set ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.deletarEnderecoConvenio = function(params, callback) {

    var query = "delete from endereco_convenio where ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.consultarTipoEndereco = function(params, callback) {

    var query = "select * from tipo_endereco";

    DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.consultarTipoEnderecoPorId = function(params, callback) {

    var query = "select * from tipo_endereco where id = ?";

    DatabaseUtil.handlerConnection(query, params, callback);

  }
