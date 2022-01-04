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
//....................................
/**
* @swagger 
* tags:
*  name: User
*  description: This is for the main User
* /api/auth/signup:
*  post:
*   tags: [User]
*   summary: Signup user.
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
*         description: Signup
 */




/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Usres]
 *     description: Creates a new user
 *     produces:
 *       - application/json


 *     responses:
 *       200:
 *         description: Successfully signin
 */
  app.post(
    "/api/auth/signup",multer,
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.patch("/:id",multer, controller.update);
  //....................................
/**
* @swagger 
* tags:
*  name: User
*  description: This is for the main User
* /api/auth/signin:
*  post:
*   tags: [User]
*   summary: Signin user.
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
*         description: Signin
 */




/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: [Usres]
 *     description: Creates a new user
 *     produces:
 *       - application/json


 *     responses:
 *       200:
 *         description: Successfully signin
 */
  
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signinFace", controller.signinFace);
   //....................................
/**
* @swagger 
* tags:
*  name: User
*  description: This is for the main User
* /forgotPassword:
*  post:
*   tags: [User]
*   summary: forgotPassword.
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
*         description: forgotPassword.
 */




/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     tags: [Usres]
 *     description: forgotPassword
 *     produces:
 *       - application/json


 *     responses:
 *       200:
 *         description: Successfully forgotPassword
 */
  app.post("/forgotPassword",getUserByMail, controller.forgetp);
   //....................................
/**
* @swagger 
* tags:
*  name: User
*  description: This is for the main User
* /resetPassword/:email/:token:
*  post:
*   tags: [User]
*   summary: resetPassword.
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
*         description: forgotPassword.
 */




/**
 * @swagger
 * /resetPassword/:email/:token:
 *   post:
 *     tags: [Usres]
 *     description: ResetPassword
 *     produces:
 *       - application/json


 *     responses:
 *       200:
 *         description: Successfully resetPassword
 */
  app.post("/resetPassword/:email/:token", controller.resetpassword);
};

