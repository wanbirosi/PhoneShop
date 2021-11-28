"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var OrderDetail = require('../models/OrderDetail');

var Order = require('../models/Order');

var User = require('../models/User');

var nodemailer = require('nodemailer');

var fs = require('fs');

module.exports = {
  getAllByOrderId: function getAllByOrderId(req, res, next) {
    var orderId, orderDetails;
    return regeneratorRuntime.async(function getAllByOrderId$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            orderId = req.params.orderId;
            _context.next = 4;
            return regeneratorRuntime.awrap(OrderDetail.find({
              order: orderId
            }).populate('product'));

          case 4:
            orderDetails = _context.sent;
            return _context.abrupt("return", res.json({
              success: true,
              data: orderDetails
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: _context.t0
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  getAllByUserId: function getAllByUserId(req, res, next) {
    var userId, orders, orderDetails, i, ods;
    return regeneratorRuntime.async(function getAllByUserId$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.userId;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Order.find({
              user: userId
            }));

          case 4:
            orders = _context2.sent;
            orderDetails = [];
            i = 0;

          case 7:
            if (!(i < orders.length)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 10;
            return regeneratorRuntime.awrap(OrderDetail.find({
              order: orders[i]._id
            }).populate('product'));

          case 10:
            ods = _context2.sent;
            orderDetails.push.apply(orderDetails, _toConsumableArray(ods));

          case 12:
            i++;
            _context2.next = 7;
            break;

          case 15:
            return _context2.abrupt("return", res.json({
              success: true,
              data: orderDetails
            }));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              success: false,
              message: _context2.t0
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 18]]);
  },
  create: function create(req, res, next) {
    var userId, user, transporter, html, mailOptions, _req$body, message, paymentMethod, orderDetails, order;

    return regeneratorRuntime.async(function create$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.userId;
            _context4.next = 3;
            return regeneratorRuntime.awrap(User.findOne({
              _id: userId
            }));

          case 3:
            user = _context4.sent;
            transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'sondeptrai2288@gmail.com',
                pass: 'SOn01698182219'
              }
            });
            _context4.next = 7;
            return regeneratorRuntime.awrap(fs.readFileSync('./template/emailTemplate.html').toString());

          case 7:
            html = _context4.sent;
            mailOptions = {
              from: 'sondeptrai2288@gmail.com',
              to: user.email,
              subject: 'ĐƠN HÀNG ĐẾN TỪ ELECTRONIC SHOP',
              html: html
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            _context4.prev = 10;
            _req$body = req.body, message = _req$body.message, paymentMethod = _req$body.paymentMethod, orderDetails = _req$body.orderDetails;

            if (user) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return", res.status(403).json({
              success: falce,
              message: 'You do not have permission to create order'
            }));

          case 14:
            order = new Order({
              address: user.address,
              phone: user.phone || '0359525432',
              message: message,
              paymentMethod: paymentMethod,
              user: userId
            });
            _context4.next = 17;
            return regeneratorRuntime.awrap(order.save());

          case 17:
            orderDetails.forEach(function _callee(item) {
              var od;
              return regeneratorRuntime.async(function _callee$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      od = new OrderDetail({
                        count: item.count,
                        order: order._id,
                        product: item.product
                      });
                      _context3.next = 3;
                      return regeneratorRuntime.awrap(od.save());

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
            return _context4.abrupt("return", res.json({
              success: true,
              message: 'Create successfully'
            }));

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](10);
            console.log('error', _context4.t0.message);
            res.status(500).json({
              success: false,
              message: _context4.t0.message
            });

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[10, 21]]);
  },
  "delete": function _delete(req, res, next) {
    var id, order;
    return regeneratorRuntime.async(function _delete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(OrderDetail.findByIdAndDelete(id));

          case 4:
            order = _context5.sent;

            if (order) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              success: false,
              message: 'OrderDetail not found'
            }));

          case 7:
            order.isDeleted = true;
            return _context5.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
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