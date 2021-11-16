var express = require('express');
var router = express.Router();
var Team = require('../models/team.model.js');

//Geting all Team
router.get('/', async (req, res) => {
  try {
    const team = await Team.find()
    res.json(team)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Getting Team
router.get('/:id', getTeam, (req, res) => {
  res.json(res.team)
})
//Creatin Team
router.route("/register").post((req, res) => {
  Team.findOne({id: req.body.id}).then(team => {
      if (!team) {
          var team = new Team({
              nom: req.body.nom,
              email: req.body.email,
              password: req.body.password,
              id : req.body.id
          });
          team.save((err, team) => {
              if (err) res.json(err);
              else res.json(team);
          });
      } else {
          res.json({error: " Team already exist"})
      }
  });
});
//Deleting Team
router.route('/:id').delete((req, res) => {
  Team.findByIdAndDelete(req.params.id)
    .then(() => res.json('Team with id='+req.params.id+' deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Updating Team
router.patch('/:id', getTeam, async (req, res) => {
  if (req.body.nom != null) {
    res.team.nom = req.body.nom
  }
  if (req.body.email != null) {
    res.team.email = req.body.email
  }
  if (req.body.email != null) {
    res.team.email = req.body.email
  }
  if (req.body.password != null) {
    res.team.password = req.body.password
  }
  if (req.body.id != null) {
    res.team.id = req.body.id
  }
  try {
    const updatedTeam = await res.team.save()
    res.json(updatedTeam)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//test
router.get('/ghaith', function(req, res, next) {
  res.send('this is ghaith route');
});
//findFunction
async function getTeam(req, res, next) {
  let team
  try {
    team = await Team.findById(req.params.id)
    if (team == null) {
      return res.status(404).json({ message: 'Cannot find Team' })
    }
    else{

    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.team = team
  next()
}

module.exports = router;