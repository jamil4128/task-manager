"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var Task = require("../model/task");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        console.log(validator.isEmail(value));
        throw new Error("Not an email");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate: function validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Cannot contain 'password'");
      }
    }
  },
  age: {
    type: Number,
    "default": 0,
    validate: function validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive");
      }
    }
  },
  avatar: {
    type: Buffer
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
}; //generateToken


userSchema.methods.generateAuthToken = function _callee() {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user._id.toString()
          }, "Thisismycourse");
          user.tokens = user.tokens.concat({
            token: token
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          return _context.abrupt("return", token);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}; //login credentials


userSchema.statics.findByCredentials = function _callee2(email, password) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          throw new Error("NO User found");

        case 5:
          if (user.password) {
            _context2.next = 7;
            break;
          }

          throw new Error("NO password found");

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          throw new Error("Password incorrect");

        case 12:
          return _context2.abrupt("return", user);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //password hash


userSchema.pre("save", function _callee3(next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = this;

          if (!user.isModified("password")) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context3.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
}); //delete task before saving

userSchema.pre("remove", function _callee4(next) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = this;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Task.deleteMany({
            owner: user._id
          }));

        case 3:
          next();

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model("User", userSchema);
module.exports = User;