const config = require("../config/auth.config");
const { tournoi } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Team = db.team;
const Tournoi = db.tournoi;

exports.userWithoutTournoi = (req, res) => {
  User.find({
    tournoi: null
   }).exec((err, users) => {
   if (err) {
     res.status(500).send({ message: err });
     return;
   }
   var t = {};
   var count = 5;
   var i=0;
   var teamNumber = 0;

   //while(users.length)
   t.members = [];
   for (let user of users) {
     //61c36927dedff711fd5564ac
     //var randomPlayer = users [Math.floor(Math.random()*users.length)];
     
     
     var randomPlayer = users.splice(Math.floor(Math.random()*users.length),1);
     var PlayerId = randomPlayer[0]._id;
     t.members.push(PlayerId);
     //delete randomPlayer;
     console.log(randomPlayer);
     console.log(PlayerId);
     i++;
     if(i==count && req.params.id  != PlayerId){

       t.members.push(req.params.id);
       t.name = "Team "+teamNumber;
       const tournoi = new Tournoi({
         name: t.name,
         members: t.members
       });
       tournoi.save();
       Tournoi.populate(tournoi, {path:"members"}, function(err, result) { return res.json(result); });
         teamNumber++;
     }
     if(i==users.length){
       t.name = "Team "+teamNumber;
       const team = new Team({
         name: t.name,
         members: t.members
       });
       tournoi.save();
       Tournoi.populate(team, {path:"members"}, function(err, result) { return res.json(result); });
         teamNumber++;
      }
   }
 
  
 });
};