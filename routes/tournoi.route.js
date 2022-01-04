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

  //....................................
/**
* @swagger 
* tags:
*  name: User
*  description: This is for the main User
* /api/tournoi/create/random/:id:
*  post:
*   tags: [User]
*   summary: reservation random tournoi.
*   requestBody:
*      content:
*       application/json:
*         schema:
*           type: object
*           properties:
*             username:
*              type: string
*            
*             password:
*              type: string
*                     
*  responses:
*      201:
*         description: Successfully get random .
 */




/**
 * @swagger
 * /api/tournoi/create/random/:id:
 *   post:
 *     tags: [Usres]
 *     description: Successfully get random .
 *     produces:
 *       - application/json


 *     responses:
 *       200:
 *         description: Successfully get random .
 */
  app.post("/api/tournoi/create/random/:id", controller.userWithoutTournoi);

};