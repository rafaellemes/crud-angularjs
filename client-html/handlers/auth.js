

exports.checkAuth = function(req, res, next){
/*  console.log("path: : " + req.path);
  if(req.path !== '/#/login'){

    auth = req.headers['authorization'];

    if(auth){

      next();
    }else{
      console.log("redirect: : " + req.path);
           res.render('login');
         //next();
    }

  }else{
    next();
  }
*/
    next();

};
