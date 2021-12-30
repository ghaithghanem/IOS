const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const multer = require("../middleware/multer-config");

const getUserByMail = require("../middleware/forgetpasswordd");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",multer,
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.patch("/:id",multer, controller.update);
  
  app.post("/api/auth/signin", controller.signin);
  app.post("/forgotPassword",getUserByMail, controller.forgetp);
  app.post("/resetPassword/:email/:token", controller.resetpassword);
};

