var pessoaDAO = getmodule("../api-rest/dao/pessoaDAO");
var msgUtil = getmodule("../api-rest/util/MessageUtil");
var Constants = getmodule("../api-rest/util/Constants");
var url = require('url');

function handlerResult(res, pessoas, err){
  if(err) {
    msgUtil.showError(res, err);
    return;
  }

  res.status(200).json(pessoas);
}

exports.ativos = function(req, res){

  pessoaDAO.ativos(null, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });

};

exports.inativos = function(req, res){

  pessoaDAO.inativos(null, function(pessoas, err){
      handlerResult(res, pessoas, err);

  });

};

exports.cadastrar = function(req, res){

  pessoaDAO.cadastrar(req.body.dados, function(pessoas, err){
    handlerResult(res, pessoas, err);

  });

};

exports.alterar = function(req, res){

  var params = [req.body.dados.set, req.body.dados.id];
  pessoaDAO.alterar(params, function(pessoas, err){

    console.log("ERROR" + err)
    handlerResult(res, pessoas, err);

  });


};

exports.deletar = function(req, res){

  pessoaDAO.deletar(req.body.dados, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });

};

exports.id = function(req, res){

  pessoaDAO.id(req.params.id, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};

exports.usuario = function(req, res){

  pessoaDAO.usuario(req.params.usuario, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};

exports.tipo = function(req, res){

  pessoaDAO.tipo(req.params.tipo, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};

exports.nome = function(req, res){

  pessoaDAO.nome(req.params.nome, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};

exports.sobrenome = function(req, res){

  pessoaDAO.sobrenome(req.params.sobrenome, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};

exports.cpf = function(req, res){

  pessoaDAO.cpf(req.params.cpf, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};


exports.email = function(req, res){

  pessoaDAO.email(req.params.email, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};

exports.crm = function(req, res){

  pessoaDAO.crm(req.params.crm, function(pessoas, err){

    handlerResult(res, pessoas, err);

  });
};

exports.filtro = function(req, res){


  var parsedUrl = url.parse(req.url, true);

  if(!isEmpty(parsedUrl.query)){

    pessoaDAO.filtro(getQueryFilter(parsedUrl.query), function(pessoas, err){

      console.log(pessoas);
      //invertido pois nessa query o resultado vem em ordem diferente
      handlerResult(res, err, pessoas);

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
    if(filter.id_tipo_pessoa){
      sql += " and id_tipo_pessoa =" + filter.id_tipo_pessoa;
    }
    if(filter.nome){
      sql += " and nome like '%" + filter.nome +"%'";
    }
    if(filter.sobrenome){
      sql += " and sobrenome like '%" + filter.sobrenome +"%'";
    }
    if(filter.email){
      sql += " and email like '%" + filter.email +"%'";
    }
    if(filter.cpf){
      sql += " and cpf like '%" + filter.cpf +"%'";
    }
    if(filter.crm){
      sql += " and crm like '%" + filter.crm +"%'";
    }

    if(filter.nome_mae){
      sql += " and nome_mae like '%" + filter.nome_mae +"%'";
    }

    if(filter.nome_empresa){
      sql += " and nome_empresa like '%" + filter.nome_empresa +"%'";
    }

    if(filter.ativo){
      sql += " and ativo = " + filter.ativo;
    }


    console.log(sql)
  return sql;

}
