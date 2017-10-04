App.controller('HomeController', function($scope, $base64){
//{"dados":{"login":usuario.login, "senha":usuario.senha }}
  console.log("Controller");
  var token = sessionStorage.token;
    $scope.login = "";

  if(token !== "undefined"){
    console.log(token);
    var usuario = $base64.decode(token);
    var jsonObj = angular.fromJson(usuario);
    $scope.login = jsonObj.login;
    App.value('user', jsonObj);
  }


  $scope.logout = function(obj){
    //$scope.footer += " -- ";
  }

  $scope.verConta = function(obj){
    //$scope.footer += " -- ";
  }
});
