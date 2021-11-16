var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');

//Geting all Users
router.get('/', async (req, res) => {
  try {
    const user = await User.find()
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Getting User
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})
//Creatin User
router.route("/register").post((req, res) => {
  User.findOne({id: req.body.id}).then(user => {
      if (!user) {
          var user = new User({
              nom: req.body.nom,
              email: req.body.email,
              password: req.body.password,
              id : req.body.id
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
//Deleting user
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User with id='+req.params.id+' deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Updating user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.nom != null) {
    res.user.nom = req.body.nom
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  if (req.body.id != null) {
    res.user.id = req.body.id
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//test
router.get('/ghaith', function(req, res, next) {
  res.send('this is ghaith route');
});
//findFunction
async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find User' })
    }
    else{

    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router;
