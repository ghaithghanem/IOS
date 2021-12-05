const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
    name : {type : String , required : true},
    members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;