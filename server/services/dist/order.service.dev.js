"use strict";

var Order = require('../models/Order');

var User = require('../models/User');

module.exports = {
  getAll: function getAll(req, res, next) {
    var orders;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Order.find().populate('user', ['name', 'image']));

          case 3:
            orders = _context.sent;
            return _context.abrupt("return", res.json({
              success: true,
              data: orders
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
    var id, order;
    return regeneratorRuntime.async(function getById$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Order.findOne({
              _id: id
            }).populate('user', ['name', 'image']));

          case 4:
            order = _context2.sent;

            if (!order) {
              res.status(400).json({
                success: false,
                message: 'Order not found'
              });
            }

            return _context2.abrupt("return", res.json({
              success: true,
              data: order
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
    var userId, _req$body, message, paymentMethod, user, order;

    return regeneratorRuntime.async(function create$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userId = req.userId;
            _req$body = req.body, message = _req$body.message, paymentMethod = _req$body.paymentMethod; // Địa chỉ số điện thoại lấy từ current user

            _context3.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              _id: userId
            }));

          case 5:
            user = _context3.sent;

            if (user) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(403).json({
              success: falce,
              message: 'You do not have permission to create order'
            }));

          case 8:
            order = new Order({
              address: user.address,
              phone: user.phone || '0359525432',
              message: message,
              paymentMethod: paymentMethod,
              user: userId
            });
            _context3.next = 11;
            return regeneratorRuntime.awrap(order.save());

          case 11:
            return _context3.abrupt("return", res.json({
              success: true,
              message: 'Create successfully',
              data: order
            }));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              success: false,
              message: _context3.t0.message
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 14]]);
  },
  "delete": function _delete(req, res, next) {
    var id, order;
    return regeneratorRuntime.async(function _delete$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id; //   const order = await Order.findOne({ _id: id })

            _context4.next = 4;
            return regeneratorRuntime.awrap(Order.findByIdAndDelete(id));

          case 4:
            order = _context4.sent;

            if (!order) {
              res.status(400).json({
                success: false,
                message: 'Order not found'
              });
            } //   order.isDeleted = true


            return _context4.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
            }));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              success: false,
              message: _context4.t0.message
            }));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }
};