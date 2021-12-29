const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./Login.model");
db.role = require("./role.model");
db.team = require("./team.model");
db.tournoi = require("./tournoi.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;