var log = getmodule("../api-rest/util/Logger");
var msgUtil = getmodule("../api-rest/util/MessageUtil");
var Constants = getmodule("../api-rest/util/Constants");
var usuarioDAO = getmodule("../api-rest/dao/usuarioDAO");

function getJsonParams(auth){

if (auth) {
  // Pula o "BASIC ";
  var b64 = new Buffer(auth.substring(6), 'base64');
  var sParams = b64.toString();

  try{
      var authJson = JSON.parse(sParams);
      if(authJson){
         return authJson;
      }
  }catch(Err){
    var pr = sParams.split(":");

    if(pr){
        return {"login":pr[0], "senha":pr[1]};
    }
    return null;

  }

}
  return null;
}


exports.auth = function(req, res, next){

  log.debug("AuthUtil - auth");

  var headAuth = req.headers['authorization'];

   var authParams = getJsonParams(headAuth);
  if(authParams){

      log.debug("Auth - params " + authParams.login);
      var params = [authParams.login, authParams.senha];
  log.debug("Auth - PARAMS " + params);
      usuarioDAO.login(params, function(usuarios, err){
        if(err){
          msgUtil.showError(res, err);
          return;
        }

        var usu = usuarios && usuarios.length > 0 ? usuarios[0] : null;
        log.debug("Auth - callback - usu " + usu);

        if(usu){
          next();
        }else{
          msgUtil.show401Error(res, Constants.errorMessage.requireAuth);

        }


      });


  }else{
    msgUtil.showError(res, Constants.errorMessage.noParams);
  }


}
