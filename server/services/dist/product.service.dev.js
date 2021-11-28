"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fs = require('fs');

var Product = require('./../models/Product');

var Comment = require('./../models/Comment');

var fileHelper = require('./../common/fileuploadHelper');

var updatePrivate = function updatePrivate(req, res, next) {
  var id, pro, _req$body, name, price, promotion, image, description, isFreeship, isInstallment, content, parameter, category, brand, newProduct, product;

  return regeneratorRuntime.async(function updatePrivate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find({
            _id: id
          }));

        case 3:
          pro = _context.sent;
          _req$body = req.body, name = _req$body.name, price = _req$body.price, promotion = _req$body.promotion, image = _req$body.image, description = _req$body.description, isFreeship = _req$body.isFreeship, isInstallment = _req$body.isInstallment, content = _req$body.content, parameter = _req$body.parameter, category = _req$body.category, brand = _req$body.brand;
          newProduct = {
            name: name,
            category: category,
            price: price,
            promotion: promotion,
            description: description,
            isFreeship: isFreeship,
            isInstallment: isInstallment,
            image: image,
            viewCount: pro.viewCount || 0,
            rating: pro.rating || 0,
            parameter: _toConsumableArray(JSON.parse(parameter)),
            content: content,
            brand: brand
          };
          _context.next = 8;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate({
            _id: id
          }, newProduct, {
            "new": true
          }));

        case 8:
          product = _context.sent;

          if (!product) {
            res.status(400).json({
              success: false,
              message: 'Product not found'
            });
          }

          return _context.abrupt("return", res.json({
            success: true,
            message: 'Update successfully'
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getAll: function getAll(req, res, next) {
    var products;
    return regeneratorRuntime.async(function getAll$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(Product.find().populate('category', ['name', 'description']).populate('brand', ['name', 'logo']));

          case 3:
            products = _context2.sent;
            return _context2.abrupt("return", res.json({
              success: true,
              data: products
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
            return regeneratorRuntime.awrap(Product.findOne({
              _id: id
            }).populate('category', ['name', 'description']).populate('brand', ['name', 'logo']));

          case 4:
            product = _context3.sent;

            if (!product) {
              res.status(400).json({
                success: false,
                message: 'Product not found'
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
  create: function create(req, res, next) {
    var image, _req$body2, name, price, promotion, description, isFreeship, isInstallment, content, parameter, category, brand, product;

    return regeneratorRuntime.async(function create$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            if (!req.files) {
              _context4.next = 10;
              break;
            }

            _context4.next = 4;
            return regeneratorRuntime.awrap(fileHelper.saveImageProduct(req));

          case 4:
            image = _context4.sent;
            _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price, promotion = _req$body2.promotion, description = _req$body2.description, isFreeship = _req$body2.isFreeship, isInstallment = _req$body2.isInstallment, content = _req$body2.content, parameter = _req$body2.parameter, category = _req$body2.category, brand = _req$body2.brand;
            product = new Product({
              name: name,
              category: category,
              price: price,
              promotion: promotion,
              description: description,
              isFreeship: isFreeship,
              isInstallment: isInstallment,
              image: image,
              parameter: _toConsumableArray(JSON.parse(parameter)),
              content: content,
              brand: brand
            });
            _context4.next = 9;
            return regeneratorRuntime.awrap(product.save());

          case 9:
            return _context4.abrupt("return", res.json({
              success: true,
              message: 'Create successfully'
            }));

          case 10:
            return _context4.abrupt("return", res.status(400).json({
              success: false,
              message: 'Data is not valid'
            }));

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              success: false,
              message: _context4.t0.message
            }));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  "delete": function _delete(req, res, next) {
    var id, product;
    return regeneratorRuntime.async(function _delete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(fileHelper.deleteImageProductById(id));

          case 4:
            _context5.next = 6;
            return regeneratorRuntime.awrap(Product.findByIdAndDelete({
              _id: id
            }));

          case 6:
            product = _context5.sent;

            if (product) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              success: false,
              message: 'Product not found'
            }));

          case 9:
            return _context5.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
            }));

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json({
              success: false,
              message: _context5.t0.message
            }));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 12]]);
  },
  update: function update(req, res, next) {
    var image, _image;

    return regeneratorRuntime.async(function update$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;

            if (!req.files) {
              _context6.next = 11;
              break;
            }

            _context6.next = 4;
            return regeneratorRuntime.awrap(fileHelper.saveImageAndDeleteImageProduct(req));

          case 4:
            image = _context6.sent;
            req.body.image = image;
            _context6.next = 8;
            return regeneratorRuntime.awrap(updatePrivate(req, res, next));

          case 8:
            return _context6.abrupt("return", _context6.sent);

          case 11:
            _context6.next = 13;
            return regeneratorRuntime.awrap(fileHelper.deleteImageProduct(req));

          case 13:
            _image = _context6.sent;
            req.body.image = _image;
            _context6.next = 17;
            return regeneratorRuntime.awrap(updatePrivate(req, res, next));

          case 17:
            return _context6.abrupt("return", _context6.sent);

          case 18:
            _context6.next = 24;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0.message);
            return _context6.abrupt("return", res.status(500).json({
              success: false,
              message: _context6.t0.message
            }));

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 20]]);
  },
  updateRating: function updateRating(req, res, next) {
    var _ret;

    return regeneratorRuntime.async(function updateRating$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return regeneratorRuntime.awrap(function _callee() {
              var products, cmts, comments, _loop, i, a;

              return regeneratorRuntime.async(function _callee$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return regeneratorRuntime.awrap(Product.find().populate('category', ['name', 'description']).populate('brand', ['name', 'logo']));

                    case 2:
                      products = _context8.sent;
                      cmts = [];
                      _context8.next = 6;
                      return regeneratorRuntime.awrap(Comment.find());

                    case 6:
                      comments = _context8.sent;

                      _loop = function _loop(i) {
                        var cs, sum;
                        return regeneratorRuntime.async(function _loop$(_context7) {
                          while (1) {
                            switch (_context7.prev = _context7.next) {
                              case 0:
                                cs = comments.filter(function (c) {
                                  return c.product + '' == products[i]._id + '';
                                });

                                if (!(cs && cs.length > 0)) {
                                  _context7.next = 7;
                                  break;
                                }

                                sum = 0;
                                sum = cs.reduce(function (sum, _ref) {
                                  var starNumber = _ref.starNumber;
                                  return sum + starNumber;
                                }, 0);
                                products[i].rating = Number(sum) / Number(cs.length);
                                _context7.next = 7;
                                return regeneratorRuntime.awrap(products[i].save());

                              case 7:
                              case "end":
                                return _context7.stop();
                            }
                          }
                        });
                      };

                      i = 0;

                    case 9:
                      if (!(i < products.length)) {
                        _context8.next = 15;
                        break;
                      }

                      _context8.next = 12;
                      return regeneratorRuntime.awrap(_loop(i));

                    case 12:
                      i++;
                      _context8.next = 9;
                      break;

                    case 15:
                      a = products.map(function (p) {
                        return {
                          name: p.name,
                          rating: p.rating
                        };
                      });
                      return _context8.abrupt("return", {
                        v: res.json({
                          success: true,
                          data: comments
                        })
                      });

                    case 17:
                    case "end":
                      return _context8.stop();
                  }
                }
              });
            }());

          case 3:
            _ret = _context9.sent;

            if (!(_typeof(_ret) === "object")) {
              _context9.next = 6;
              break;
            }

            return _context9.abrupt("return", _ret.v);

          case 6:
            _context9.next = 12;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0.message);
            res.status(500).json({
              success: false,
              message: _context9.t0
            });

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[0, 8]]);
  }
};