const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
 getUserByMail = async (req, res, next) => {
    let user
    try {
      user = await  User.findOne({ email: req.body.email })
      if (user == null) {
        return res.status(404).json({ reponse: "mail non trouve" })
      }
  
    } catch (error) {
      return res.status(500).json({ reponse: error.message })
    }
    res.user = user
    next()
  }
  //const forgetpassword = getUserByMail ;
  module.exports = getUserByMail;