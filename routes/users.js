var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route("/register").post((req, res) => {
  User.findOne({email: req.body.email}).then(user => {
      if (!user) {
          var user = new User({
              nom: req.body.nom,
              email: req.body.email,
              password: req.body.password
          });
          user.save((err, user) => {
              if (err) res.json(err);
              else res.json(user);
          });
      } else {
          res.json({error: " User already exist"})
      }
  });
});


router.get('/ghaith', function(req, res, next) {
  res.send('this is ghaith route');
});

module.exports = router;
