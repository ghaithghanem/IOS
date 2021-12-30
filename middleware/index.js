const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const multer = require("./multer-config");
const getUserByMail = require("./forgetpasswordd");
module.exports = getUserByMail;
module.exports = multer;
module.exports = {
  authJwt,
  verifySignUp,
};
