"use strict";

var CategoryUser = require('./../models/CategoryUser');

module.exports = {
  getAll: function getAll(req, res, next) {
    var categories;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(CategoryUser.find());

          case 3:
            categories = _context.sent;
            return _context.abrupt("return", res.json({
              success: true,
              data: categories
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
  getById: function getById(req, res, next) {
    var id, category;
    return regeneratorRuntime.async(function getById$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(CategoryUser.findOne({
              _id: id
            }));

          case 4:
            category = _context2.sent;

            if (!category) {
              res.status(400).json({
                success: false,
                message: 'CategoryUser not found'
              });
            }

            return _context2.abrupt("return", res.json({
              success: true,
              data: category
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              success: false,
              message: _context2.t0
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  create: function create(req, res, next) {
    var _req$body, name, displayName, description, category;

    return regeneratorRuntime.async(function create$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, name = _req$body.name, displayName = _req$body.displayName, description = _req$body.description;
            category = new CategoryUser({
              name: name,
              displayName: displayName,
              description: description
            });
            _context3.next = 5;
            return regeneratorRuntime.awrap(category.save());

          case 5:
            return _context3.abrupt("return", res.json({
              success: true,
              message: 'Create successfully'
            }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              success: false,
              message: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  "delete": function _delete(req, res, next) {
    var id, category;
    return regeneratorRuntime.async(function _delete$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return regeneratorRuntime.awrap(CategoryUser.findByIdAndDelete({
              _id: id
            }));

          case 4:
            category = _context4.sent;

            if (!category) {
              res.status(400).json({
                success: false,
                message: 'CategoryUser not found'
              });
            }

            return _context4.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
            }));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              success: false,
              message: _context4.t0.message
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  update: function update(req, res, next) {
    var id, _req$body2, name, displayName, description, newCategory, category;

    return regeneratorRuntime.async(function update$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, displayName = _req$body2.displayName, description = _req$body2.description;
            newCategory = {
              name: name,
              displayName: displayName,
              description: description
            };
            _context5.next = 6;
            return regeneratorRuntime.awrap(CategoryUser.findByIdAndUpdate({
              _id: id
            }, newCategory, {
              "new": true
            }));

          case 6:
            category = _context5.sent;

            if (!category) {
              res.status(400).json({
                success: false,
                message: 'CategoryUser not found'
              });
            }

            return _context5.abrupt("return", res.json({
              success: true,
              message: 'Update successfully'
            }));

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              success: false,
              message: _context5.t0.message
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 11]]);
  }
};