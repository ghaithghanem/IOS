const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const multer = require("../middleware/multer-config");



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
  app.patch("/:id", controller.update);
  
  app.post("/api/auth/signin", controller.signin);
};

