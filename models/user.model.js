const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    nom : {type : String , required : true},
    email : {type : String , required : true},
    password : {type:String , required : true, minlength: 3},
    //team:
});

const User = mongoose.model('User', userSchema);

module.exports = User;