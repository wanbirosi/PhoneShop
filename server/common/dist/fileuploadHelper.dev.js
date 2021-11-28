"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fs = require('fs');

var Product = require('./../models/Product');

var User = require('./../models/User');

var Brand = require('./../models/Brand'); /////////////////////////////////////////////////////////////
// Product


var saveImageProduct = function saveImageProduct(req) {
  var arrFileNames, i, fileupload, randStr;
  return regeneratorRuntime.async(function saveImageProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!req.files) {
            _context.next = 14;
            break;
          }

          // danh sách các image mới
          arrFileNames = [];
          i = 1;

        case 4:
          if (!req.files["fileUpload".concat(i)]) {
            _context.next = 13;
            break;
          }

          fileupload = req.files["fileUpload".concat(i)];
          randStr = Math.random() * 100000;
          _context.next = 9;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/product/' + randStr + fileupload.name));

        case 9:
          arrFileNames.push(randStr + fileupload.name);
          i++;
          _context.next = 4;
          break;

        case 13:
          return _context.abrupt("return", arrFileNames.join('|'));

        case 14:
          _context.next = 18;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var saveImageAndDeleteImageProduct = function saveImageAndDeleteImageProduct(req) {
  var _id, arrFileNamesOld, arrFileNames, data, i, fileupload, randStr;

  return regeneratorRuntime.async(function saveImageAndDeleteImageProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (!req.files) {
            _context2.next = 22;
            break;
          }

          // danh sách các image cũ
          _id = req.body._id;
          arrFileNamesOld = []; // danh sách các image mới

          arrFileNames = [];

          if (req.body.image) {
            arrFileNames.push(_toConsumableArray(req.body.image.split('|')));
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 8:
          data = _context2.sent;
          data.image.split('|').forEach(function (item) {
            return arrFileNamesOld.push(item);
          });
          i = 1;

        case 11:
          if (!req.files["fileUpload".concat(i)]) {
            _context2.next = 20;
            break;
          }

          fileupload = req.files["fileUpload".concat(i)];
          randStr = Math.random() * 100000;
          _context2.next = 16;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/product/' + randStr + fileupload.name));

        case 16:
          arrFileNames.push(randStr + fileupload.name);
          i++;
          _context2.next = 11;
          break;

        case 20:
          arrFileNamesOld.forEach(function (item) {
            var check = arrFileNames.indexOf(item) !== -1;

            if (!check) {
              fs.unlink('public/images/product/' + item, function () {});
            }
          });
          return _context2.abrupt("return", arrFileNames.join('|'));

        case 22:
          _context2.next = 26;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 24]]);
};

var deleteImageProduct = function deleteImageProduct(req) {
  var _id, arrFileNamesOld, arrFileNames, data;

  return regeneratorRuntime.async(function deleteImageProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // danh sách các image cũ
          _id = req.body._id;
          arrFileNamesOld = []; // danh sách các image mới

          arrFileNames = _toConsumableArray(req.body.image.split('|'));
          _context3.next = 6;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 6:
          data = _context3.sent;
          data.image.split('|').forEach(function (item) {
            return arrFileNamesOld.push(item);
          });
          arrFileNamesOld.forEach(function (item) {
            var check = arrFileNames.indexOf(item) !== -1;

            if (!check) {
              fs.unlink('public/images/product/' + item, function () {});
            }
          });
          return _context3.abrupt("return", arrFileNames.join('|'));

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var deleteImageProductById = function deleteImageProductById(_id) {
  var arrFileNamesOld, data;
  return regeneratorRuntime.async(function deleteImageProductById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // danh sách các image cũ
          arrFileNamesOld = [];
          _context4.next = 4;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 4:
          data = _context4.sent;
          data.image.split('|').forEach(function (item) {
            return arrFileNamesOld.push(item);
          });
          arrFileNamesOld.forEach(function (item) {
            fs.unlink('public/images/comment/' + item, function () {});
          });
          _context4.next = 11;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; /////////////////////////////////////////////////////////////
// User


var saveImageUser = function saveImageUser(req) {
  var fileupload, randStr;
  return regeneratorRuntime.async(function saveImageUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;

          if (!req.files) {
            _context5.next = 7;
            break;
          }

          fileupload = req.files["fileUpload"];
          randStr = Math.random() * 100000;
          _context5.next = 6;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/user/' + randStr + fileupload.name));

        case 6:
          return _context5.abrupt("return", randStr + fileupload.name);

        case 7:
          _context5.next = 11;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var deleteImageUserById = function deleteImageUserById(_id) {
  var data;
  return regeneratorRuntime.async(function deleteImageUserById$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 3:
          data = _context6.sent;

          if (data) {
            fs.unlink('public/images/user/' + data.image, function () {});
          }

          _context6.next = 9;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var deleteImagePath = function deleteImagePath(path) {
  return regeneratorRuntime.async(function deleteImagePath$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          try {
            fs.unlink(path, function () {});
          } catch (error) {}

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var saveImageAndDeleteImageUser = function saveImageAndDeleteImageUser(req) {
  var _id, fileNameOld, fileupload, randStr;

  return regeneratorRuntime.async(function saveImageAndDeleteImageUser$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;

          if (!req.files) {
            _context8.next = 12;
            break;
          }

          // image cũ
          _id = req.body._id;
          fileNameOld = req.body.image;
          fileupload = req.files["fileUpload"];
          randStr = Math.random() * 100000;
          _context8.next = 8;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/user/' + randStr + fileupload.name));

        case 8:
          fs.unlink('public/images/user/' + fileNameOld, function () {});
          return _context8.abrupt("return", randStr + fileupload.name);

        case 12:
          return _context8.abrupt("return", req.body.image);

        case 13:
          _context8.next = 17;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);

        case 17:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; /////////////////////////////////////////////////////////////
// Brand


var saveImageBrand = function saveImageBrand(req) {
  var fileupload, randStr;
  return regeneratorRuntime.async(function saveImageBrand$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;

          if (!req.files) {
            _context9.next = 7;
            break;
          }

          fileupload = req.files["fileUpload"];
          randStr = Math.random() * 100000;
          _context9.next = 6;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/brand/' + randStr + fileupload.name));

        case 6:
          return _context9.abrupt("return", randStr + fileupload.name);

        case 7:
          _context9.next = 12;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.log('save error');

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var deleteImageBrandById = function deleteImageBrandById(_id) {
  var data;
  return regeneratorRuntime.async(function deleteImageBrandById$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 3:
          data = _context10.sent;

          if (data) {
            fs.unlink('public/images/brand/' + data.image, function () {});
          }

          _context10.next = 9;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var saveImageAndDeleteImageBrand = function saveImageAndDeleteImageBrand(req) {
  var _id, fileNameOld, fileupload, randStr;

  return regeneratorRuntime.async(function saveImageAndDeleteImageBrand$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;

          if (!req.files) {
            _context11.next = 10;
            break;
          }

          // image cũ
          _id = req.body._id;
          fileNameOld = req.body.image;
          fileupload = req.files["fileUpload"];
          randStr = Math.random() * 100000;
          _context11.next = 8;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/brand/' + randStr + fileupload.name));

        case 8:
          fs.unlink('public/images/brand/' + fileNameOld, function () {});
          return _context11.abrupt("return", randStr + fileupload.name);

        case 10:
          return _context11.abrupt("return", req.body.logo);

        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](0);
          return _context11.abrupt("return", req.body.logo);

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; /////////////////////////////////////////////////////////////
// Advertisement


var saveImageAdvertisement = function saveImageAdvertisement(req) {
  var fileupload, randStr;
  return regeneratorRuntime.async(function saveImageAdvertisement$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;

          if (!req.files) {
            _context12.next = 7;
            break;
          }

          fileupload = req.files["fileUpload"];
          randStr = Math.random() * 100000;
          _context12.next = 6;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/advertisement/' + randStr + fileupload.name));

        case 6:
          return _context12.abrupt("return", randStr + fileupload.name);

        case 7:
          _context12.next = 12;
          break;

        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          console.log('save error');

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var deleteImageAdvertisementById = function deleteImageAdvertisementById(_id) {
  var data;
  return regeneratorRuntime.async(function deleteImageAdvertisementById$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 3:
          data = _context13.sent;

          if (data) {
            fs.unlink('public/images/advertisement/' + data.image, function () {});
          }

          _context13.next = 9;
          break;

        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);

        case 9:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var saveImageAndDeleteImageAdvertisement = function saveImageAndDeleteImageAdvertisement(req) {
  var _id, fileNameOld, fileupload, randStr;

  return regeneratorRuntime.async(function saveImageAndDeleteImageAdvertisement$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;

          if (!req.files) {
            _context14.next = 10;
            break;
          }

          // image cũ
          _id = req.body._id;
          fileNameOld = req.body.image;
          fileupload = req.files["fileUpload"];
          randStr = Math.random() * 100000;
          _context14.next = 8;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/advertisement/' + randStr + fileupload.name));

        case 8:
          fs.unlink('public/images/advertisement/' + fileNameOld, function () {});
          return _context14.abrupt("return", randStr + fileupload.name);

        case 10:
          return _context14.abrupt("return", req.body.logo);

        case 13:
          _context14.prev = 13;
          _context14.t0 = _context14["catch"](0);
          return _context14.abrupt("return", req.body.logo);

        case 16:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; /////////////////////////////////////////////////////////////
// Comment


var saveImageComment = function saveImageComment(req) {
  var arrFileNames, i, fileupload, randStr;
  return regeneratorRuntime.async(function saveImageComment$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;

          if (!req.files) {
            _context15.next = 14;
            break;
          }

          // danh sách các image mới
          arrFileNames = [];
          i = 1;

        case 4:
          if (!req.files["fileUpload".concat(i)]) {
            _context15.next = 13;
            break;
          }

          fileupload = req.files["fileUpload".concat(i)];
          randStr = Math.random() * 100000;
          _context15.next = 9;
          return regeneratorRuntime.awrap(fileupload.mv('public/images/comment/' + randStr + fileupload.name));

        case 9:
          arrFileNames.push(randStr + fileupload.name);
          i++;
          _context15.next = 4;
          break;

        case 13:
          return _context15.abrupt("return", arrFileNames.join('|'));

        case 14:
          _context15.next = 18;
          break;

        case 16:
          _context15.prev = 16;
          _context15.t0 = _context15["catch"](0);

        case 18:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var deleteImageCommentById = function deleteImageCommentById(_id) {
  var arrFileNamesOld, data;
  return regeneratorRuntime.async(function deleteImageCommentById$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          // danh sách các image cũ
          arrFileNamesOld = [];
          _context16.next = 4;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 4:
          data = _context16.sent;
          data.image.split('|').forEach(function (item) {
            return arrFileNamesOld.push(item);
          });
          arrFileNamesOld.forEach(function (item) {
            fs.unlink('public/images/comment/' + item, function () {});
          });
          _context16.next = 11;
          break;

        case 9:
          _context16.prev = 9;
          _context16.t0 = _context16["catch"](0);

        case 11:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  deleteImagePath: deleteImagePath,
  saveImageProduct: saveImageProduct,
  saveImageAndDeleteImageProduct: saveImageAndDeleteImageProduct,
  deleteImageProduct: deleteImageProduct,
  deleteImageProductById: deleteImageProductById,
  saveImageUser: saveImageUser,
  deleteImageUserById: deleteImageUserById,
  saveImageAndDeleteImageUser: saveImageAndDeleteImageUser,
  saveImageBrand: saveImageBrand,
  deleteImageBrandById: deleteImageBrandById,
  saveImageAndDeleteImageBrand: saveImageAndDeleteImageBrand,
  saveImageAdvertisement: saveImageAdvertisement,
  deleteImageAdvertisementById: deleteImageAdvertisementById,
  saveImageAndDeleteImageAdvertisement: saveImageAndDeleteImageAdvertisement,
  saveImageComment: saveImageComment,
  deleteImageCommentById: deleteImageCommentById
};