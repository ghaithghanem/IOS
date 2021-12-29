const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tournoiSchema = new mongoose.Schema({
    name : {type : String , required : true},
    members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ]
});

const Tournoi = mongoose.model('Tournoi', tournoiSchema);

module.exports = Tournoi;