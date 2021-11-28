"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('dotenv').config();

var fs = require('fs');

var argon2 = require('argon2');

var jwt = require('jsonwebtoken');

var User = require('./../models/User');

var CategoryUser = require('./../models/CategoryUser');

var fileHelper = require('./../common/fileuploadHelper');

var verifyToken = require('./../middleware/auth');

module.exports = {
  getAll: function getAll(req, res, next) {
    var Users;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(User.find().populate('categoryUser', ['name', 'displayName', 'description']).select('-password'));

          case 3:
            Users = _context.sent;
            return _context.abrupt("return", res.json({
              success: true,
              data: Users
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: _context.t0
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  login: function login(req, res, next) {
    var _req$body, username, password, user, passwordValid, accessToken;

    return regeneratorRuntime.async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, username = _req$body.username, password = _req$body.password;

            if (!(!username || !password)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: 'Username or Password is not valid'
            }));

          case 4:
            _context2.next = 6;
            return regeneratorRuntime.awrap(User.findOne({
              username: username
            }));

          case 6:
            user = _context2.sent;

            if (user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: 'Incorrect Username or Password'
            }));

          case 9:
            _context2.next = 11;
            return regeneratorRuntime.awrap(argon2.verify(user.password, password));

          case 11:
            passwordValid = _context2.sent;

            if (passwordValid) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: 'Incorrect Username or Password'
            }));

          case 14:
            // return token
            accessToken = jwt.sign({
              userId: user._id
            }, process.env.ACCESS_TOKEN_SECRET);
            return _context2.abrupt("return", res.json({
              success: true,
              message: 'User logged in successfully',
              accessToken: accessToken
            }));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.log('error');
            return _context2.abrupt("return", (res.status(500), json({
              success: false,
              message: _context2.t0.message
            })));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 18]]);
  },
  checkAuth: function checkAuth(req, res, next) {
    var userId, user;
    return regeneratorRuntime.async(function checkAuth$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userId = req.userId;
            _context3.next = 4;
            return regeneratorRuntime.awrap(User.findOne({
              _id: userId
            }).select('-password').populate('categoryUser', ['name', 'displayName', 'description']));

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: 'User not found'
            }));

          case 7:
            return _context3.abrupt("return", res.json({
              success: true,
              data: _objectSpread({}, user)
            }));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log('error', _context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              success: false,
              message: _context3.t0
            }));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  getById: function getById(req, res, next) {
    var id, user;
    return regeneratorRuntime.async(function getById$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return regeneratorRuntime.awrap(User.findOne({
              _id: id
            }).populate('category', ['name', 'displayName', 'description']));

          case 4:
            user = _context4.sent;

            if (!user) {
              res.status(400).json({
                success: false,
                message: 'User not found'
              });
            }

            return _context4.abrupt("return", res.json({
              success: true,
              data: user
            }));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              success: false,
              message: _context4.t0
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  create: function create(req, res, next) {
    var _req$body2, name, username, password, email, address, phone, checkUser, hashedPassword, image, categoryUser, user, accessToken;

    return regeneratorRuntime.async(function create$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (!req.files) {
              _context5.next = 22;
              break;
            }

            _req$body2 = req.body, name = _req$body2.name, username = _req$body2.username, password = _req$body2.password, email = _req$body2.email, address = _req$body2.address, phone = _req$body2.phone;
            _context5.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              username: username
            }));

          case 5:
            checkUser = _context5.sent;

            if (!checkUser) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              success: false,
              message: 'User already exists'
            }));

          case 8:
            _context5.next = 10;
            return regeneratorRuntime.awrap(argon2.hash(password));

          case 10:
            hashedPassword = _context5.sent;
            _context5.next = 13;
            return regeneratorRuntime.awrap(fileHelper.saveImageUser(req));

          case 13:
            image = _context5.sent;
            _context5.next = 16;
            return regeneratorRuntime.awrap(CategoryUser.findOne({
              name: 'CUSTOMER'
            }));

          case 16:
            categoryUser = _context5.sent;
            user = new User({
              name: name,
              username: username,
              password: hashedPassword,
              email: email,
              phone: phone,
              image: image,
              address: address,
              categoryUser: categoryUser._id
            });
            _context5.next = 20;
            return regeneratorRuntime.awrap(user.save());

          case 20:
            // return token
            accessToken = jwt.sign({
              userId: user._id
            }, process.env.ACCESS_TOKEN_SECRET);
            return _context5.abrupt("return", res.json({
              success: true,
              message: 'Create successfully',
              accessToken: accessToken
            }));

          case 22:
            return _context5.abrupt("return", res.status(400).json({
              success: false,
              message: 'Data is not valid'
            }));

          case 25:
            _context5.prev = 25;
            _context5.t0 = _context5["catch"](0);
            console.log('error', _context5.t0.message);
            return _context5.abrupt("return", res.status(500).json({
              success: false,
              message: _context5.t0.message
            }));

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 25]]);
  },
  "delete": function _delete(req, res, next) {
    var id, userId, currentUser, userCanDelete, user;
    return regeneratorRuntime.async(function _delete$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            userId = req.userId;
            _context6.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              _id: userId
            }).populate('categoryUser', ['name', 'displayName', 'description']));

          case 5:
            currentUser = _context6.sent;

            if (!(currentUser.categoryUser.name === 'CUSTOMER')) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.status(403).json({
              success: false,
              message: 'You do not have permission to delete this user'
            }));

          case 8:
            _context6.next = 10;
            return regeneratorRuntime.awrap(User.find({
              _id: id
            }));

          case 10:
            userCanDelete = _context6.sent;

            if (!(userCanDelete.name === 'ADMIN')) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt("return", res.status(403).json({
              success: false,
              message: "You do not have permission to delete admin's permissions."
            }));

          case 13:
            _context6.next = 15;
            return regeneratorRuntime.awrap(User.findByIdAndDelete(id));

          case 15:
            user = _context6.sent;

            if (user) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              success: false,
              message: 'User not found'
            }));

          case 18:
            _context6.next = 20;
            return regeneratorRuntime.awrap(fileHelper.deleteImagePath('public/images/user/' + user.image));

          case 20:
            return _context6.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
            }));

          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).json({
              success: false,
              message: _context6.t0.message
            }));

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 23]]);
  },
  update: function update(req, res, next) {
    var image, userId, _req$body3, name, email, address, phone, oldUser;

    return regeneratorRuntime.async(function update$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return regeneratorRuntime.awrap(fileHelper.saveImageAndDeleteImageUser(req));

          case 3:
            image = _context7.sent;
            userId = req.userId;
            _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, address = _req$body3.address, phone = _req$body3.phone;
            _context7.next = 8;
            return regeneratorRuntime.awrap(User.findById(userId));

          case 8:
            oldUser = _context7.sent;

            if (oldUser) {
              _context7.next = 11;
              break;
            }

            return _context7.abrupt("return", res.status(400).json({
              success: false,
              message: 'User not found'
            }));

          case 11:
            oldUser.name = name;
            oldUser.email = email;
            oldUser.phone = phone;
            oldUser.image = image;
            oldUser.address = address;
            _context7.next = 18;
            return regeneratorRuntime.awrap(oldUser.save());

          case 18:
            return _context7.abrupt("return", res.json({
              success: true,
              message: 'Update successfully'
            }));

          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(500).json({
              success: false,
              message: _context7.t0.message
            }));

          case 24:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 21]]);
  },
  updateAccount: function updateAccount(req, res, next) {
    var userId, _req$body4, username, password, newPassword, user, passwordValid, hashedPassword;

    return regeneratorRuntime.async(function updateAccount$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            userId = req.userId;
            _req$body4 = req.body, username = _req$body4.username, password = _req$body4.password, newPassword = _req$body4.newPassword;
            _context8.next = 5;
            return regeneratorRuntime.awrap(User.findById(userId));

          case 5:
            user = _context8.sent;

            if (!user) {
              res.status(400).json({
                success: false,
                message: 'User not found'
              });
            }

            _context8.next = 9;
            return regeneratorRuntime.awrap(argon2.verify(user.password, password));

          case 9:
            passwordValid = _context8.sent;

            if (passwordValid) {
              _context8.next = 12;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              success: false,
              message: 'Incorrect Username or Password'
            }));

          case 12:
            _context8.next = 14;
            return regeneratorRuntime.awrap(argon2.hash(newPassword));

          case 14:
            hashedPassword = _context8.sent;
            user.password = hashedPassword;
            _context8.next = 18;
            return regeneratorRuntime.awrap(user.save());

          case 18:
            return _context8.abrupt("return", res.json({
              success: true,
              message: 'Update successfully'
            }));

          case 21:
            _context8.prev = 21;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.status(500).json({
              success: false,
              message: _context8.t0.message
            }));

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 21]]);
  },
  updatePermission: function updatePermission(req, res, next) {
    var id, userId, user, currentUser, categories, category;
    return regeneratorRuntime.async(function updatePermission$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            id = req.params.id;
            userId = req.userId;
            _context9.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              _id: id
            }).populate('categoryUser', ['name', 'displayName', 'description']));

          case 5:
            user = _context9.sent;
            _context9.next = 8;
            return regeneratorRuntime.awrap(User.findOne({
              _id: userId
            }).populate('categoryUser', ['name', 'displayName', 'description']));

          case 8:
            currentUser = _context9.sent;

            if (!(currentUser.categoryUser.name === 'CUSTOMER')) {
              _context9.next = 11;
              break;
            }

            return _context9.abrupt("return", res.status(403).json({
              success: false,
              message: 'You do not have permission to update this user'
            }));

          case 11:
            if (!(user.name === 'ADMIN')) {
              _context9.next = 13;
              break;
            }

            return _context9.abrupt("return", res.status(403).json({
              success: false,
              message: "You do not have permission to update admin's permissions."
            }));

          case 13:
            _context9.next = 15;
            return regeneratorRuntime.awrap(CategoryUser.find());

          case 15:
            categories = _context9.sent;
            _context9.next = 18;
            return regeneratorRuntime.awrap(categories.find(function (ca) {
              return ca.name !== user.categoryUser.name;
            }));

          case 18:
            category = _context9.sent;
            user.categoryUser = category._id;
            user.save(user);
            res.json({
              success: true,
              message: 'Update permission successfully',
              data: category
            });
            _context9.next = 27;
            break;

          case 24:
            _context9.prev = 24;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", res.status(500).json({
              success: false,
              message: _context9.t0.message
            }));

          case 27:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[0, 24]]);
  }
};