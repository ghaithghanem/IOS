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
      var count = 5;
      var i=0;
      var teamNumber = 0;
      //while(users.length)
      t.members = [];
      for (let user of users) {
        t.members.push(user._id);
        delete user;
        console.log(users.length);
        i++;
        if(i==count){
            break;
            teamNumber++;
        }
      }
      t.name = "Team "+teamNumber;
      const team = new Team({
        name: t.name,
        members: t.members
      });
      team.save();
      Team.populate(team, {path:"members"}, function(err, result) { return res.json(result); });
    });
};