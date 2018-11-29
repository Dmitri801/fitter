const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

// Local Strategy
const localLogin = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  function(email, password, done) {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "We don't have an account with that email on file"
        });
      }
      user.validPassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }
);

// JWT Strategy

// Set up options for JWT strategy
const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  User.findOne({ _id: jwt_payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});
// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
