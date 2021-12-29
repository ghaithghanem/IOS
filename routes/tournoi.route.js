const { authJwt } = require("../middleware");
const controller = require("../controllers/tournoi.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/tournoi/create/random/:id", controller.userWithoutTournoi);

};