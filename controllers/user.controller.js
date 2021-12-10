const User = require("../models/Login.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  exports.getAll = async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
  exports.delt = (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User with id='+req.params.id+' deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  }