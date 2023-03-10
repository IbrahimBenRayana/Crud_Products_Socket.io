//create a product model 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    Libelle: {type : String, required:true } ,
    prix: {type : Number, required:true },
    Quantite: {type : Number, required:true } ,
    Designation : {type : String }
});

module.exports = mongoose.model('Product', ProductSchema);
