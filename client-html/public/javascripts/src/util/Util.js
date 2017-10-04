
App.factory('Util', function(){


  return {

        copyJson: function(json){

          var nJson = {};

          angular.forEach(json, function(v, k){

              if(v && k != '$$hashKey'){
                nJson[k] = v;
              }

          });

          return nJson;

        },
        handlerJsonAlterar: function(form){

          var dados = form.dados;
          var id = dados.id;

          delete dados.id;
          delete form.dados;

          form.dados = {};
          form.dados.id = id;
          form.dados.set = dados;

          return form;

        },
        handlerJsonDepoisAlterar: function(form){

          var dados = form.dados.set;
          dados.id = form.dados.id;

          delete form.id;
          delete form.set;

          var nForm = {};
          nForm.dados = dados;


          return nForm;

        },
        handlerJsonDeletar: function(form){
          var nForm = {dados:{set:{ativo:0}}};
          nForm.dados.id = form.id;

          return nForm;
        },
        getAuth: function(){

          return "BASIC " + sessionStorage.token;

        },
        isEmpty : function(obj){
          return Object.keys(obj).length === 0
        },

        handlerDate: function(date){

          var ds = date.split("/");

          return ds[2] + "/" + ds[1] +"/" + ds[0];

        },
        handlerDateToView: function(date){

          //1988-09-08T03:00:00.000Z
            var dm = date.split("T");

            var ds = dm[0].split("-");

            return ds[2] + "/" + ds[1] +"/" + ds[0];

        }

  };




});
