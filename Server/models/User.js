const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  goals: {
    type: String,
    default: "Get Fittr"
  },
  admin: {
    type: String,
    default: false
  }
});

UserSchema.methods.validPassword = function(password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
