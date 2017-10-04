App.controller('LoginController', ['$scope', '$http', 'LoginService','$base64',
      function($scope, $http, LoginService,$base64 ){

    sessionStorage.token = undefined;
//  $scope.dados = { login: '', senha: ''};

  $scope.form = { dados: { login: '', senha: ''}};

  $scope.showMsg = false;

  $scope.submit = function(){


    if(!$scope.form.dados.login || !$scope.form.dados.senha){
        $scope.showMsg = true;
      return;
    }

    LoginService.login($scope.form).success(function (usuario)
    {

        var jSon = "{\"login\":\""+usuario.login+"\", \"senha\":\"" + usuario.senha + "\" }";
        var token = $base64.encode(jSon);

        //$http.defaults.headers.common.Authorization = 'BASIC ' + token;
        sessionStorage.token = token;
        //console.log(token);
         window.location.href = "/";

    }).error(function(data, status, headers, config) {
        $scope.showMsg = true;        ;
        console.log(status);
     });


  };

}]);
