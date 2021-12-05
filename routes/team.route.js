const { authJwt } = require("../middleware");
const controller = require("../controllers/team.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/team/create/random", controller.userWithoutTeam);

};