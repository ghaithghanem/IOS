const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/test/all", controller.allAccess);
//....................................
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - profilePicture
 *         
 *       properties:
 *       username:
 *           type: string
 *           description: his username
 *       email:
 *           type: string
 *           description: his email
 *       password:
 *           type: string
 *           description: his password
 *       profilePicture:
 *           type: string
 *           description: his Picture
 *        
 *        
 *
 *
 *       example:
 *         username: ghaitth
 *         email: gggg@.com 
 *         password: 7894gg
 *         profilePicture: lien htt
 *        
 */




 /**
  * @swagger
 

 * /getalll:
 *   description: The users managing API
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [usres]
 *     responses:
 *       200:
 *         description: The list users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
  *       500:
 *         description: user error
 */

  app.get("/getalll", controller.getAll);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.delete("/:id", controller.delt);
};
  