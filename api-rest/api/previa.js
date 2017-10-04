  var previaDAO = getmodule("../api-rest/dao/previaDAO");
  var msgUtil = getmodule("../api-rest/util/MessageUtil");
  var Constants = getmodule("../api-rest/util/Constants");
  var url = require('url');



  function handlerResult(res, tabelas, err) {
      if (err) {
          msgUtil.showError(res, err);
          return;
      }

      res.status(200).json(tabelas);
  }


  exports.id = function (req, res) {

      previaDAO.id(null, function (previas, err) {

          handlerResult(res, previas, err);

      });

  };

  exports.pacientes = function (req, res) {
      previaDAO.pacientes(req.params.id_clinica, function (pacientes, err) {

          handlerResult(res, pacientes, err);

      });
  }
  exports.convenios = function (req, res) {

      previaDAO.convenios(req.params.id_clinica, function (pacientes, err) {

          handlerResult(res, pacientes, err);

      });
  }
  
  exports.tipos = function (req, res) {

      previaDAO.tipos(function (tipos, err) {

          handlerResult(res, tipos, err);

      });
  } 
  exports.status = function (req, res) {

      previaDAO.status(function (tipos, err) {

          handlerResult(res, tipos, err);

      });
  }

  exports.filtro = function (req, res) {

      var parsedUrl = url.parse(req.url, true);

      if (!isEmpty(parsedUrl.query)) {

          previaDAO.filtro(getQueryFilter(parsedUrl.query), function (previas, err) {

              handlerResult(res, previas, err);

          });
      } else {
          msgUtil.showError(res, Constants.errorMessage.noParamatersFilter);
      }

  };

  var isEmpty = function (obj) {
      return Object.keys(obj).length === 0;
  }

  function getQueryFilter(filter) {

      var sql = "1 = 1 ";

      if (filter.id) {
          sql += " and p.id = " + filter.id;
      }

      if (filter.id_tipo_previa) {
          sql += " and p.id_tipo_previa =" + filter.id_tipo_previa;
      }

      if (filter.id_convenio) {
          sql += " and p.id_convenio =" + filter.id_convenio;
      }

      if (filter.id_clinica) {
          sql += " and cc.id_clinica =" + filter.id_clinica;
      }

      if (filter.id_pessoa) {
          sql += " and p.id_pessoa =" + filter.id_pessoa;
      }

      if (filter.id_status) {
          sql += " and p.id_status =" + filter.id_status;
      }

      if (filter.dt_inicio && filter.dt_fim) {
          sql += " and date(p.data) between '" + filter.dt_inicio + "' and '" + filter.dt_fim + "'";
      } else if (filter.dt_inicio) {
          sql += " and date(p.data) = '" + filter.dt_inicio + "'";
      }


      if (filter.observacao) {
          sql += " and p.observacao like '%" + filter.observacao + "%'";
      }

      console.log(sql)
      return sql;

  }
