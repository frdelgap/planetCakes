var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var passportLocalMongoose = require('passport-local-mongoose'); 


var UsuarioSchema = new Schema({    
	username: String,    
	password: String,
	perfil:   String,
	conectado:Boolean,
	createdAt  : {type : Date, default : Date.now} 
	}); 

UsuarioSchema.plugin(passportLocalMongoose); 
var Usuarios = mongoose.model('Usuarios', UsuarioSchema);
module.exports = mongoose.model('Usuarios', UsuarioSchema); 