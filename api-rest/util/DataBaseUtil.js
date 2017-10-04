var log = getmodule("../api-rest/util/Logger");
var Constants = getmodule("../api-rest/util/Constants");
var mysql      = require('mysql');

var connection = null;



var connectCallback = function(err)
{
  if(!err) {
      log.info("Database is connected ... \n\n");
  } else {
      log.info("Error connecting database ... \n\n" + err);
  }
}

/**
data = {
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'app-escola'
}

*/
function createConnection(data)
{
  if(data){
      connection = mysql.createConnection(data);
      connection.connect(connectCallback);
  }else{
    throw new Error("DatabaseUtil: createConnection: data is undefined")
  }



}

function closeConnection(){

  if(connection){
      connection.end();
      log.info("Database was closed")
  }
  else {
      throw new Error("Connection is not created");
  }

}
/**
  select function(err, rows, fields)
  data = [{title:'ex'}]
  update|insert|delete|select = function(err, result)
  Feche a conexao no callback
*/
function executeQuery(strQuery, params, resultCallback){
  if(connection){
    if(params){
        connection.query(strQuery, params, resultCallback);
    }
    else  {
      connection.query(strQuery, resultCallback);
    }
  }
  else{
    throw "Connection is not created";
  }


}

function getConnection()
{
  return connection;
}


exports.handlerConnection = function(query, params, callback){

  createConnection(Constants.coreDataBase);

  executeQuery(query, params, function(err, rows, fields)
  {
      closeConnection();

      return callback(rows, err);

  });
}
