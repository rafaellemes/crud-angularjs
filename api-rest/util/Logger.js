
var Logger = { "DEBUG":"DEBUG: ", "ERROR":"ERROR: ", "INFO":"INFO: " };

function log(logger, msg){
  console.log(logger + " " + msg);
}

exports.debug = function (msg){

  log(Logger.DEBUG, msg);

}

exports.error = function (msg){

  log(Logger.ERROR, msg);

}

exports.info = function (msg){

  log(Logger.INFO, msg);

}
