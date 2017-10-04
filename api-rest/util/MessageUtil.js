
exports.showError = function(res, msg){

  res.status(400).json({"Erro": msg, "status":"400"});

};


exports.show401Error = function(res, msg){

  res.status(401).json({"Erro": msg, "status":"400"});

};
