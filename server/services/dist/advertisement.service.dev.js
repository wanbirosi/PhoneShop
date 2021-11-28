"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fs = require('fs');

var Advertisement = require('./../models/Advertisement');

var fileHelper = require('./../common/fileuploadHelper');

module.exports = {
  getAll: function getAll(req, res, next) {
    var advertisements;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = _toConsumableArray;
            _context.next = 4;
            return regeneratorRuntime.awrap(Advertisement.find());

          case 4:
            _context.t1 = _context.sent;

            _context.t2 = function (a, b) {
              return a.displayOrder - b.displayOrder;
            };

            advertisements = (0, _context.t0)(_context.t1).sort(_context.t2);
            return _context.abrupt("return", res.json({
              success: true,
              data: advertisements
            }));

          case 10:
            _context.prev = 10;
            _context.t3 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: _context.t3
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  getById: function getById(req, res, next) {
    var id, advertisement;
    return regeneratorRuntime.async(function getById$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Advertisement.findOne({
              _id: id
            }));

          case 4:
            advertisement = _context2.sent;

            if (!advertisement) {
              res.status(400).json({
                success: false,
                message: 'advertisement not found'
              });
            }

            return _context2.abrupt("return", res.json({
              success: true,
              data: advertisement
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
    var image, _req$body, name, description, url, displayOrder, advertisement, advertisements;

    return regeneratorRuntime.async(function create$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            if (!req.files) {
              _context4.next = 14;
              break;
            }

            _context4.next = 4;
            return regeneratorRuntime.awrap(fileHelper.saveImageAdvertisement(req));

          case 4:
            image = _context4.sent;
            _req$body = req.body, name = _req$body.name, description = _req$body.description, url = _req$body.url, displayOrder = _req$body.displayOrder;
            advertisement = new Advertisement({
              name: name,
              description: description,
              image: image,
              url: url,
              displayOrder: displayOrder
            });
            _context4.next = 9;
            return regeneratorRuntime.awrap(Advertisement.find({}));

          case 9:
            advertisements = _context4.sent;
            advertisements.forEach(function _callee(item) {
              return regeneratorRuntime.async(function _callee$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!(item.displayOrder >= displayOrder)) {
                        _context3.next = 4;
                        break;
                      }

                      item.displayOrder++;
                      _context3.next = 4;
                      return regeneratorRuntime.awrap(item.save());

                    case 4:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
            _context4.next = 13;
            return regeneratorRuntime.awrap(advertisement.save());

          case 13:
            return _context4.abrupt("return", res.json({
              success: true,
              message: 'Create successfully'
            }));

          case 14:
            return _context4.abrupt("return", res.status(400).json({
              success: false,
              message: 'Data is not valid'
            }));

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              success: false,
              message: _context4.t0.message
            }));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 17]]);
  },
  "delete": function _delete(req, res, next) {
    var id, advertisement, advertisements;
    return regeneratorRuntime.async(function _delete$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return regeneratorRuntime.awrap(fileHelper.deleteImageAdvertisementById(id));

          case 4:
            _context6.next = 6;
            return regeneratorRuntime.awrap(Advertisement.findByIdAndDelete({
              _id: id
            }));

          case 6:
            advertisement = _context6.sent;

            if (advertisement) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              success: false,
              message: 'Advertisement not found'
            }));

          case 9:
            _context6.next = 11;
            return regeneratorRuntime.awrap(Advertisement.find({}));

          case 11:
            advertisements = _context6.sent;
            advertisements.forEach(function _callee2(item) {
              return regeneratorRuntime.async(function _callee2$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (!(item.displayOrder > advertisement.displayOrder)) {
                        _context5.next = 4;
                        break;
                      }

                      item.displayOrder--;
                      _context5.next = 4;
                      return regeneratorRuntime.awrap(item.save());

                    case 4:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            });
            return _context6.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
            }));

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).json({
              success: false,
              message: _context6.t0.message
            }));

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 16]]);
  },
  update: function update(req, res, next) {
    var id, advertisement, image, displayOrderOld, _req$body2, name, description, url, displayOrder, _advertisement, advertisements;

    return regeneratorRuntime.async(function update$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id;
            _context9.next = 3;
            return regeneratorRuntime.awrap(Advertisement.findOne({
              _id: id
            }));

          case 3:
            advertisement = _context9.sent;
            image = advertisement.image, displayOrderOld = advertisement.displayOrder;
            _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, url = _req$body2.url, displayOrder = _req$body2.displayOrder;
            _context9.prev = 6;

            if (!req.files) {
              _context9.next = 11;
              break;
            }

            _context9.next = 10;
            return regeneratorRuntime.awrap(fileHelper.saveImageAndDeleteImageAdvertisement(req));

          case 10:
            image = _context9.sent;

          case 11:
            _context9.next = 13;
            return regeneratorRuntime.awrap(Advertisement.findOne({
              _id: id
            }));

          case 13:
            _advertisement = _context9.sent;

            if (_advertisement) {
              _context9.next = 16;
              break;
            }

            return _context9.abrupt("return", res.status(400).json({
              success: false,
              message: 'Advertisement not found'
            }));

          case 16:
            _context9.next = 18;
            return regeneratorRuntime.awrap(Advertisement.find({}));

          case 18:
            advertisements = _context9.sent;

            if (displayOrderOld > displayOrder) {
              advertisements.forEach(function _callee3(item) {
                return regeneratorRuntime.async(function _callee3$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!(item.displayOrder >= displayOrder && item.displayOrder < displayOrderOld && item._id !== id)) {
                          _context7.next = 4;
                          break;
                        }

                        item.displayOrder++;
                        _context7.next = 4;
                        return regeneratorRuntime.awrap(item.save());

                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }
                });
              });
            } else if (displayOrderOld < displayOrder) {
              advertisements.forEach(function _callee4(item) {
                return regeneratorRuntime.async(function _callee4$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        if (!(item.displayOrder <= displayOrder && item.displayOrder > displayOrderOld && item._id !== id)) {
                          _context8.next = 4;
                          break;
                        }

                        item.displayOrder--;
                        _context8.next = 4;
                        return regeneratorRuntime.awrap(item.save());

                      case 4:
                      case "end":
                        return _context8.stop();
                    }
                  }
                });
              });
            }

            _advertisement.image = image;
            _advertisement.name = name;
            _advertisement.description = description;
            _advertisement.url = url;
            _advertisement.displayOrder = displayOrder;
            _context9.next = 27;
            return regeneratorRuntime.awrap(_advertisement.save());

          case 27:
            return _context9.abrupt("return", res.json({
              success: true,
              message: 'Update successfully'
            }));

          case 30:
            _context9.prev = 30;
            _context9.t0 = _context9["catch"](6);
            console.log(_context9.t0.message);
            return _context9.abrupt("return", res.status(500).json({
              success: false,
              message: _context9.t0.message
            }));

          case 34:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[6, 30]]);
  }
};