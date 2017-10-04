var usuarioDAO = getmodule("../api-rest/dao/usuarioDAO");
var msgUtil = getmodule("../api-rest/util/MessageUtil");
var Constants = getmodule("../api-rest/util/Constants");
var url = require('url');

exports.login = function(req, res){
 //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
//res.status(200).json({"user":"LOGIN"})
console.log(req.body);
var params = [req.body.dados.login, req.body.dados.senha];

usuarioDAO.login(params, function(usuarios, err){

  if(err) {
    msgUtil.showError(res, err);
    return;
  }

  if(usuarios && usuarios.length > 0){
     res.status(200).json(usuarios[0]);
  }else{
    msgUtil.show401Error(res, Constants.errorMessage.userNotFind);
  }

});

};


exports.logout = function(req, res){

  res.status(200).json({"user":"Logout"});

};


exports.ativos = function(req, res){


  usuarioDAO.listarAtivos(null, function(usuarios, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(usuarios);

  });
};

exports.inativos = function(req, res){

  usuarioDAO.listarInativos(null, function(usuarios, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(usuarios);

  });
};


exports.listarPorLogin = function(req, res){

  usuarioDAO.listarPorLogin(req.params.login, function(usuarios, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(usuarios);

  });

}

exports.listarPorPerfil = function(req, res){

  usuarioDAO.listarPorPerfil(req.params.perfil, function(usuarios, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(usuarios);

  });

}

exports.cadastrar = function(req, res){

  usuarioDAO.cadastrar(req.body.dados, function(result, err){

    if(err) {
      msgUtil.showError(res, err);
      return;
    }

      res.status(200).json(result);

  });

}

exports.alterar = function(req, res){

  var params = [req.body.dados.set, req.body.dados.id];
  usuarioDAO.alterar(params, function(result, err){

    if(err) {
      msgUtil.showError(res, err);
      return;
    }

      res.status(200).json(result);

  });
}

exports.deletar = function(req, res){


  usuarioDAO.deletar(req.body.dados, function(result, err){

    if(err) {
      msgUtil.showError(res, err);
      return;
    }

      res.status(200).json(result);

  });
}


exports.perfis = function(req, res){


  usuarioDAO.perfis(null, function(usuarios, err){
    if(err) {
      msgUtil.showError(res, err);
      return;
    }

    res.status(200).json(usuarios);

  });
};

function handlerResult(res, telefones, err) {
  if (err) {
    msgUtil.showError(res, err);
    return;
  }

  res.status(200).json(telefones);
}

  exports.filtro = function(req, res){

    var parsedUrl = url.parse(req.url, true);

    if(!isEmpty(parsedUrl.query)){

    usuarioDAO.filtro(getQueryFilter(parsedUrl.query), function(planos, err){

      handlerResult(res, planos, err);

    });
  }else{
    msgUtil.showError(res, Constants.errorMessage.noParamatersFilter);
  }

  };

  var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
  }

  function getQueryFilter(filter){

      var sql = "1 = 1 ";

      if(filter.id){
        sql += " and id = " + filter.id;
      }

      if(filter.ativo){
        sql += " and ativo =" + filter.ativo;
      }
      if(filter.id_perfil){
        sql += " and id_perfil =" + filter.id_perfil;
      }

      if(filter.login){
        sql += " and login like '%" + filter.login +"%'";
      }

      console.log(sql)
    return sql;

  }
