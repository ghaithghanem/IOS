var express = require('express');
var router = express.Router();
var User = require('../models/Login.model.js');

//Geting all 
router.get('/', async (req, res) => {
  try {
    const login = await Login.find()
    res.json(login)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Getting Login
router.get('/:id', getLogin, (req, res) => {
  res.json(res.login)
})
//Creatin Login
router.route("/register").post((req, res) => {
    Login.findOne({nom: req.body.nom}).then(login => {
      if (!login) {
          var login = new Login({
              nom: req.body.nom,
              email: req.body.email,
              password: req.body.password,
             
          });
          login.save((err, login) => {
              if (err) res.json(err);
              else res.json(login);
          });
      } else {
          res.json({error: " login already exist"})
      }
  });
});
//Deleting login
router.route('/:id').delete((req, res) => {
    Login.findByIdAndDelete(req.params.id)
    .then(() => res.json('login with id='+req.params.id+' deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Updating login
router.patch('/:id', getLogin, async (req, res) => {
  if (req.body.nom != null) {
    res.login.nom = req.body.nom
  }
  if (req.body.email != null) {
    res.login.email = req.body.email
  }
  
  if (req.body.password != null) {
    res.login.password = req.body.password
  }
  
  try {
    const updatedLogin = await res.login.save()
    res.json(updatedLogin)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//test
router.get('/ghaith', function(req, res, next) {
  res.send('this is ghaith route');
});
//findFunction
async function getLogin(req, res, next) {
  let login
  try {
    login = await Login.findById(req.params.nom)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find Login' })
    }
    else{

    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.login = login
  next()
}

module.exports = router;
