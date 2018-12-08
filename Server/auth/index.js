const User = require("../models/User");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
require("dotenv").config();

function createToken(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timeStamp }, process.env.SECRET);
}

exports.register = function(req, res, next) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, firstName, lastName, password, goals, admin } = req.body;

  User.find({})
    .then(doc => {
      let exists = false;
      doc.forEach(user => {
        if (user.email == email) {
          exists = true;
        }
      });
      return exists;
    })
    .then(emailFound => {
      if (emailFound) {
        // - if it does return an error
        res
          .status(422)
          .json({ email: "An account with that email already exists" });
      } else {
        // - if it DOESN'T exist, create and save user record
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          goals: goals,
          admin: admin
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, null, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(doc => res.json({ token: createToken(doc), user: doc }));
          });
        });
      }
    });
};

exports.signIn = function(req, res, next) {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res
        .status(404)
        .json({ email: "There is no account under this email" });
    }
    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ err });
      }

      if (isMatch) {
        res.json({ token: createToken(user), user });
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
};
