const User = require("../models/User");
const jwt = require("jwt-simple");
const passport = require("passport");
require("dotenv").config();

function createToken(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timeStamp }, process.env.SECRET);
}

exports.register = function(req, res, next) {
  // See if a user with given email exists
  const { email, firstName, lastName, password, admin } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Email and password are required" });
  }
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
          .json({ message: "An account with that email already exists" });
      } else {
        // - if it DOESN'T exist, create and save user record
        const newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          admin: admin
        };

        User.create(newUser).then(doc =>
          // - Respond to request
          res.json({ token: createToken(doc) })
        );
      }
    });
};

exports.signIn = function(req, res, next) {
  res.json({ token: createToken(req.user) });
};
