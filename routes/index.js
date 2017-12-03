var express = require('express');
var passport = require('passport');
var Usuarios = require('../models/Usuarios.js');
var Comentarios = require('../models/Comentarios.js'); 

var router = express.Router(); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) { 
	res.render('login', { user : req.user }); 
}); 

router.post('/login', passport.authenticate('local'), function(req, res) { 
	
	res.redirect('/');
	
}); 


router.post('/loginUsers',
  passport.authenticate('local', { successRedirect: '/blogcakes',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

//Cuerpo del Blog
router.get('/blogcakes', function(req, res) {  

   Comentarios.find(function(err, list){  
   
	if(req.accepts('json')) {      

       if(err) {        

         return res.json(500, {message: 'Error recuperando comentarios.'});      
        }      
        //return res.json(list); 
		return res.render('blogcakes', {list: list ,user: req.user }); 
	 } else {      
	    if(err) {        
		    return res.send('500: Internal Server Error', 500);      
		}  
		 
		return res.render('blogcakes', {list: list, user: req.user });    
		}  
	}); 
}); 

router.get('/registro', function(req, res) { 
	 
	res.render('register', { }); 
});

router.get('/administrador', function(req, res) { 
	 
	res.render('administrador', { }); 
}); 

router.get('/sobremi', function(req, res) { 
	 
	res.render('sobremi', { }); 
}); 

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/registro', function(req, res) {  
	
	Usuarios.register( 
			new Usuarios({
				username : req.body.username,
				perfil: 'U' , 
				conectado: false }), 
			
				req.body.password, function(err, usuario) {        

					if (err) {                 
						return res.render('register', { usuario : usuario });        
					}        
	
				passport.authenticate('local')(req, res, function () { 
					res.redirect('/');        
			});    
	}); 
}); 

module.exports = router;
