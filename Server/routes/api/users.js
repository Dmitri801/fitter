const express = require("express");
const Auth = require("../../auth");
const User = require("../../models/User");
const passport = require("passport");
const router = express.Router();

// Passport routes config
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });
// @route GET
// @desc Get all users
// Private

router.get("/users", requireAuth, (req, res, next) => {
  User.find({}).then(doc =>
    res.json({
      users: doc
    })
  );
});

// @route POST
// @desc Register new user
// Public

router.post("/register", Auth.register);

// @route POST
// @desc Login User
// Public

router.post("/login", requireSignIn, Auth.signIn);

module.exports = router;
