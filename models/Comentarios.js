var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var ComentSchema = new Schema({
	
	 usuario: String,
	 nota: Number,
	 pastel: String, 
	 local: String,
	 ciudad: String,
	 comentario: {type : String, default : '', trim : true},       
	 createdAt  : {type : Date, default : Date.now} 
	 
}); 
	 
var Comentarios = mongoose.model('Comentario', ComentSchema);
module.exports = mongoose.model('Comentario', ComentSchema);