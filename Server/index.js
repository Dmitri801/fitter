const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const users = require("./routes/api/users");
const passport = require("passport");
const PORT = process.env.PORT || 3030;
require("dotenv").config();
const app = express();

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    () => {
      console.log("MongoDb Connected");
    }
  )
  .catch(err => console.log(err));

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "Whatev", resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require("./auth/passport.js");

// User API
app.use("/api", users);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
