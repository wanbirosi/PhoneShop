"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = require("./../models/Product");

module.exports = {
  add: function add(req, res, next) {
    var id, product, cartItem, check, _cartItem;

    return regeneratorRuntime.async(function add$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.params.id;
            _context.next = 4;
            return regeneratorRuntime.awrap(Product.findOne({
              _id: id
            }));

          case 4:
            product = _context.sent;

            if (product) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              message: "Product not found"
            }));

          case 7:
            if (!(req.session.cart == undefined)) {
              _context.next = 14;
              break;
            }

            req.session.cart = [];
            cartItem = {
              id: id,
              amount: 1
            };
            req.session.cart[0] = cartItem;
            return _context.abrupt("return", res.json({
              success: true,
              message: "Add successfully"
            }));

          case 14:
            check = 0;
            i = 0;

          case 16:
            if (!(i < req.session.cart.length)) {
              _context.next = 24;
              break;
            }

            if (!(req.session.cart[i].id == id)) {
              _context.next = 21;
              break;
            }

            req.session.cart[i].amount++;
            return _context.abrupt("return", res.json({
              success: true,
              message: "Add successfully"
            }));

          case 21:
            i++;
            _context.next = 16;
            break;

          case 24:
            if (!(check == 0)) {
              _context.next = 28;
              break;
            }

            _cartItem = {
              id: id,
              amount: 1
            };
            req.session.cart[req.session.cart.length] = _cartItem;
            return _context.abrupt("return", res.json({
              success: true,
              message: "Add successfully"
            }));

          case 28:
            return _context.abrupt("return", res.status(400).json({
              success: false,
              message: "Data is not valid"
            }));

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              success: false,
              message: _context.t0.message
            }));

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 31]]);
  },
  getAll: function getAll(req, res, next) {
    var list, product, listItem;
    return regeneratorRuntime.async(function getAll$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            list = [];
            i = 0;

          case 3:
            if (!(i < req.session.cart.length)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 6;
            return regeneratorRuntime.awrap(Product.findOne({
              _id: req.session.cart[i].id
            }));

          case 6:
            product = _context2.sent;
            listItem = _objectSpread({}, product, {
              amount: req.session.cart[i].amount
            });
            list.push(listItem);

          case 9:
            i++;
            _context2.next = 3;
            break;

          case 12:
            return _context2.abrupt("return", res.json({
              success: true,
              data: list
            }));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              success: false,
              message: _context2.t0
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 15]]);
  },
  "delete": function _delete(req, res, next) {
    var id, product;
    return regeneratorRuntime.async(function _delete$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return regeneratorRuntime.awrap(Product.findOne({
              _id: id
            }));

          case 4:
            product = _context3.sent;

            if (product) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: "Product not found"
            }));

          case 7:
            req.session.cart = req.session.cart.filter(function (item) {
              return item.id != id;
            });
            return _context3.abrupt("return", res.json({
              success: true,
              message: "Delete successfully"
            }));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              success: false,
              message: _context3.t0
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 11]]);
  }
};