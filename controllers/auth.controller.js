const config = require("../config/auth.config");
const db = require("../models");
const Token = db.Token;
const User = db.user;
const Role = db.role;
const nodemailer = require('nodemailer');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { getUser } = require("./user.controller");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    profilePicture: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ user: user });
        });
      });
    }
  });
};

exports.signinFace = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var token = jwt.sign({ id: user.id, roles: user.roles }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        user: user,
        accessToken: token
      });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id, roles: user.roles }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        user: user,
        accessToken: token
      });
    });
};
exports.update = async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find User' })
    }
    else {

    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user

  if (req.body.username != null) {
    res.user.username = req.body.username
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }

  if (req.file.filename != null) {
    res.user.profilePicture = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.forgetp = async (req, res, next) => {

  // user is not found into database
  if (!res.user) {
    return res.status(400).send({ msg: 'The email entred was not found by our system. Make sure your Email is correct!' });
  } else {
    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    var token = new Token({ email: res.user.email, token: seq });
    token.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      //res.user.email
    });

    var smtpTrans = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ghghaith127@gmail.com",
        pass: "25112741*"
      }
    });

    var mailOptions = {
      from: 'ghghaith127@gmail.com', to: res.user.email, subject:
        'Reset Password', text: 'You receive this email from Baladeyti application bellow you will find a link please click on it\n\n' +
          'The code is  :' + token.token + '\n\n' +
          'http:\/\/' + req.headers.host + '\/user\/resetPassword\/' + res.user.email + '\/' + token.token
          + '\n\n Si vous n\'avez pas fait cette requete, veuillez ignorer ce message et votre mot de passe sera le méme.\n'
    };
    // Send email (use credintials of SendGrid)

    //  var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
    smtpTrans.sendMail(mailOptions, function (err) {
      if (err) {
        return res.status(500).send({ msg: err });
      }
      else {
        return res.status(200).send({
          succes: true,
          msg: 'A reset password  email has been sent to ' + res.user.email + '. It will be expire after one day. ',
          token: token.token
        })
      };

    });

  }

};

exports.resetpassword = async (req, res, next) => {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired 
    if (!token) {
      return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
    }
    // if token is found then check valid user 
    else {
      User.findOne({ email: req.params.email }, async function (err, user) {
        // not valid user
        if (!user) {
          return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
        } else {

          const salt = await bcrypt.genSalt(10);
          console.log(salt)
          console.log(req.body.password, "This is the pass")
          const hashedp = await bcrypt.hash(req.body.password, salt);


          user.password = hashedp

          user.save(function (err) {
            // error occur
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            // account successfully verified
            else {
              return res.status(200).json({ reponse: 'Your password has been successfully reset' });
            }

          })

        }

      });
    }
  });

};




/*MiddleWares*/
/* Token auth
*/

