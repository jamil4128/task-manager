"use strict";

var express = require("express");

var User = require("../model/user");

var auth = require("../middleware/auth");

var router = express.Router();

var multer = require("multer");

var sharp = require("sharp");

var uploads = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter: function fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("File not supported"));
    }

    callback(undefined, true);
  }
});
router.post("/users", function _callee(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = new User(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context.sent;
          res.status(201).send({
            user: user,
            token: token
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          res.send(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router.post("/users/login", function _callee2(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findByCredentials(req.body.email, req.body.password));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context2.sent;
          res.send({
            user: user,
            token: token
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.send(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.post("/users/logout", auth, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          req.user.tokens = req.user.tokens.filter(function (tok) {
            return tok.token !== req.token;
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          res.send();
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send();

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post("/users/logoutAll", auth, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          req.user.tokens = [];
          _context4.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          res.status(200).send("Logged out of all session");
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).send();

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get("/users/me", auth, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.send(req.user);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.patch("/users/me", auth, function _callee6(req, res) {
  var allowedUpdates, reqUpdates, isupdatable;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          allowedUpdates = ["name", "email", "password", "age"];
          reqUpdates = Object.keys(req.body);
          isupdatable = reqUpdates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isupdatable) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", res.send({
            "error": "Cannot update this property"
          }));

        case 5:
          _context6.prev = 5;
          reqUpdates.forEach(function (update) {
            return req.user[update] = req.body[update];
          });
          _context6.next = 9;
          return regeneratorRuntime.awrap(req.user.save());

        case 9:
          //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
          res.send(req.user);
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](5);
          res.status(400).send(_context6.t0);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 12]]);
});
router["delete"]("/users/me", auth, function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(req.user.remove());

        case 3:
          res.send(req.user);
          _context7.next = 9;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          res.send(500).send(_context7.t0);

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.post("/users/me/avatar", auth, uploads.single("avatar"), function _callee8(req, res) {
  var buffer;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            height: 250,
            width: 250
          }).png().toBuffer());

        case 2:
          buffer = _context8.sent;
          req.user.avatar = buffer;
          _context8.next = 6;
          return regeneratorRuntime.awrap(req.user.save());

        case 6:
          res.status(200).send();

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
}, function (error, req, res, next) {
  res.status(400).send({
    error: error.message
  });
});
router.get("/users/:id/avatar", function _callee9(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context9.sent;

          if (!(!user || !user.avatar)) {
            _context9.next = 6;
            break;
          }

          throw new Error("User profile not found");

        case 6:
          res.set("content-Type", "image/png");
          res.send(user.avatar);
          _context9.next = 13;
          break;

        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          res.status(400).send(_context9.t0);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router["delete"]("/users/me/avatar", auth, function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          req.user.avatar = undefined;
          _context10.next = 3;
          return regeneratorRuntime.awrap(req.user.save());

        case 3:
          res.status(200).send();

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
module.exports = router;