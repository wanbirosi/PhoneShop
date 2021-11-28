"use strict";

var fs = require('fs');

var Comment = require('../models/Comment');

var Product = require('../models/Product');

var fileHelper = require('../common/fileuploadHelper');

var updateRating = function updateRating(product) {
  var cmts, pro, rating;
  return regeneratorRuntime.async(function updateRating$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            product: product
          }));

        case 3:
          cmts = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: product
          }));

        case 6:
          pro = _context.sent;
          rating = 0;
          cmts.forEach(function (c) {
            return rating += c.starNumber;
          });
          pro.rating = rating / cmts.length;
          _context.next = 12;
          return regeneratorRuntime.awrap(pro.save());

        case 12:
          _context.next = 16;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = {
  getAll: function getAll(req, res, next) {
    var comments;
    return regeneratorRuntime.async(function getAll$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(Comment.find().populate('user', ['name', 'image']).populate('product', ['name', 'image']));

          case 3:
            comments = _context2.sent;
            return _context2.abrupt("return", res.json({
              success: true,
              data: comments
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              success: false,
              message: _context2.t0
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getById: function getById(req, res, next) {
    var id, product;
    return regeneratorRuntime.async(function getById$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return regeneratorRuntime.awrap(Comment.findOne({
              _id: id
            }).populate('user', ['name', 'image']).populate('product', ['name', 'image']));

          case 4:
            product = _context3.sent;

            if (!product) {
              res.status(400).json({
                success: false,
                message: 'Comment not found'
              });
            }

            return _context3.abrupt("return", res.json({
              success: true,
              data: product
            }));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              success: false,
              message: _context3.t0
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  getByIdProduct: function getByIdProduct(req, res, next) {
    var productid, comment;
    return regeneratorRuntime.async(function getByIdProduct$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            productid = req.params.productid;
            _context4.next = 4;
            return regeneratorRuntime.awrap(Comment.find({
              product: {
                _id: productid
              }
            }).populate('user', ['name', 'image']).populate('product', ['name', 'image']));

          case 4:
            comment = _context4.sent;

            if (!comment) {
              res.status(400).json({
                success: false,
                message: 'Comment not found'
              });
            }

            return _context4.abrupt("return", res.json({
              success: true,
              data: comment
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
    var image, userId, _req$body, starNumber, reason, description, product, comment, id, commentfind;

    return regeneratorRuntime.async(function create$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            image = '';
            userId = req.userId;

            if (!req.files) {
              _context5.next = 7;
              break;
            }

            _context5.next = 6;
            return regeneratorRuntime.awrap(fileHelper.saveImageProduct(req));

          case 6:
            image = _context5.sent;

          case 7:
            _req$body = req.body, starNumber = _req$body.starNumber, reason = _req$body.reason, description = _req$body.description, product = _req$body.product;
            comment = new Comment({
              starNumber: starNumber,
              reason: reason,
              description: description,
              image: image,
              user: userId,
              product: product
            });
            _context5.next = 11;
            return regeneratorRuntime.awrap(comment.save());

          case 11:
            _context5.next = 13;
            return regeneratorRuntime.awrap(updateRating(product));

          case 13:
            id = comment._id;
            _context5.next = 16;
            return regeneratorRuntime.awrap(Comment.findOne({
              _id: id
            }).populate('user', ['name', 'image']));

          case 16:
            commentfind = _context5.sent;
            return _context5.abrupt("return", res.json({
              success: true,
              message: 'Create successfully',
              data: commentfind
            }));

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0.message);
            return _context5.abrupt("return", res.status(400).json({
              success: false,
              message: 'Data is not valid'
            }));

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 20]]);
  },
  "delete": function _delete(req, res, next) {
    var id, comment;
    return regeneratorRuntime.async(function _delete$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return regeneratorRuntime.awrap(fileHelper.deleteImageProductById(id));

          case 4:
            _context6.next = 6;
            return regeneratorRuntime.awrap(Comment.findByIdAndDelete({
              _id: id
            }));

          case 6:
            comment = _context6.sent;

            if (comment) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              success: false,
              message: 'Comment not found'
            }));

          case 9:
            _context6.next = 11;
            return regeneratorRuntime.awrap(updateRating(comment.product));

          case 11:
            return _context6.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
            }));

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).json({
              success: false,
              message: _context6.t0.message
            }));

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 14]]);
  }
};