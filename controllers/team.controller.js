const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Team = db.team;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.userWithoutTeam = (req, res) => {
     User.find({
        team: null
      }).exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      var t = {};
      const results = [];
      var count = 4;
      var i=0;
      var teamNumber = 0;

      //while(users.length)
      t.members = [];
      for (let user of users) {
        //61c36927dedff711fd5564ac
        //var randomPlayer = users [Math.floor(Math.random()*users.length)];
        
        
        const randomPlayer = users.splice(Math.floor(Math.random()*users.length),1);
        const PlayerId = randomPlayer[0]._id;
       
          
          if(PlayerId == req.params.id){
            continue;
          }
        
        t.members.push(PlayerId);

        //delete randomPlayer;
        //console.log(randomPlayer);
        //console.log(PlayerId);
        i++;
        if(i==count && req.params.id  != PlayerId){

          t.members.push(req.params.id);
          t.name = "Team "+teamNumber;
          const team = new Team({
            name: t.name,
            members: t.members
          });
          team.save();
          Team.populate(team, {path:"members"}, function(err, result) { return res.json(result); });
            teamNumber++;
        }
        
        
      }
   
    
    });
};