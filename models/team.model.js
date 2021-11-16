const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
    nom : {type : String , required : true},
    email : {type : String , required : true},
    password : {type:String , required : true, minlength: 3},
    id : {type : Number , required : true},
    //team:
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;