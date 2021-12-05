const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Role = db.role;
const User = db.user;

userWithoutTeam = (req, res, next) => {
    
  };