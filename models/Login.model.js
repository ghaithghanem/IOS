const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    tournoi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournoi"
  }
  })
);

module.exports = User;