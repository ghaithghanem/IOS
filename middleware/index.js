const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const multer = require("./multer-config");
module.exports = multer;
module.exports = {
  authJwt,
  verifySignUp,
};
