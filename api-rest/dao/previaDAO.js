  var DatabaseUtil = getmodule("../api-rest/util/DatabaseUtil");
  var Logger = getmodule("../api-rest/util/Logger");

  exports.id = function (params, callback) {

      var query = "select * from previa where id = ?";

      DatabaseUtil.handlerConnection(query, params, callback);

  }

  exports.pacientes = function (params, callback) {

       var query = "select p.id, p.nome from pessoa p inner join previa pr " +
                   "on p.id = pr.id_pessoa " +
                   "where p.id_tipo_pessoa = 2 and p.ativo = 1 and pr.ativo = 1 " +
                   "and pr.id_clinica = ?";

      DatabaseUtil.handlerConnection(query, params, callback);
  }

  exports.convenios = function (params, callback) {

       var query = "select c.id, c.nome from convenio c inner join previa pr " +
                   "on c.id = pr.id_convenio " +
                   "inner join clinica_convenio cc " +
                   "on c.id = cc.id_convenio " +
                   "where c.ativo = 1 and pr.ativo = 1 " +
                   "and cc.id_clinica = ? ";

      DatabaseUtil.handlerConnection(query, params, callback);
  }


  exports.filtro = function (params, callback) {

      var query = "select distinct p.*, c.nome as nm_convenio, pc.nome as paciente, " +
           "tp.nome as tipo, st.nome as status " +
           "from previa p " +
           "inner join tipo_previa tp on tp.id = p.id_tipo_previa " +
           "inner join status_previa st on st.id = p.id_status " +
           "inner join pessoa pc on pc.id = p.id_pessoa " +
           "inner join convenio c on c.id = p.id_convenio " +
           "inner join clinica_convenio cc on  cc.id_convenio = c.id " +
           "where " + params + " order by id";
      DatabaseUtil.handlerConnection(query, params, callback);

  }
  
  exports.tipos = function (callback) {

       var query = "select * from tipo_previa ";

      DatabaseUtil.handlerConnection(query, null, callback);
  }
  exports.status = function (callback) {

       var query = "select * from status_previa ";

      DatabaseUtil.handlerConnection(query, null, callback);
  }
