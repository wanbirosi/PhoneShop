"use strict";

var fs = require('fs');

var Brand = require('./../models/Brand');

var fileHelper = require('./../common/fileuploadHelper');

module.exports = {
  getAll: function getAll(req, res, next) {
    var brands;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Brand.find());

          case 3:
            brands = _context.sent;
            return _context.abrupt("return", res.json({
              success: true,
              data: brands
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
    var id, brand;
    return regeneratorRuntime.async(function getById$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Brand.findOne({
              _id: id
            }));

          case 4:
            brand = _context2.sent;

            if (!brand) {
              res.status(400).json({
                success: false,
                message: 'brand not found'
              });
            }

            return _context2.abrupt("return", res.json({
              success: true,
              data: brand
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
    var logo, _req$body, name, description, brand;

    return regeneratorRuntime.async(function create$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!req.files) {
              _context3.next = 10;
              break;
            }

            _context3.next = 4;
            return regeneratorRuntime.awrap(fileHelper.saveImageBrand(req));

          case 4:
            logo = _context3.sent;
            _req$body = req.body, name = _req$body.name, description = _req$body.description;
            brand = new Brand({
              name: name,
              description: description,
              logo: logo
            });
            _context3.next = 9;
            return regeneratorRuntime.awrap(brand.save());

          case 9:
            return _context3.abrupt("return", res.json({
              success: true,
              message: 'Create successfully'
            }));

          case 10:
            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: 'Data is not valid'
            }));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              success: false,
              message: _context3.t0.message
            }));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  "delete": function _delete(req, res, next) {
    var id, brand;
    return regeneratorRuntime.async(function _delete$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return regeneratorRuntime.awrap(fileHelper.deleteImageBrandById(id));

          case 4:
            _context4.next = 6;
            return regeneratorRuntime.awrap(Brand.findByIdAndDelete({
              _id: id
            }));

          case 6:
            brand = _context4.sent;

            if (brand) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              success: false,
              message: 'Brand not found'
            }));

          case 9:
            return _context4.abrupt("return", res.json({
              success: true,
              message: 'Delete successfully'
            }));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              success: false,
              message: _context4.t0.message
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 12]]);
  },
  update: function update(req, res, next) {
    var id, brand, logo, _req$body2, name, description, _brand;

    return regeneratorRuntime.async(function update$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return regeneratorRuntime.awrap(Brand.findOne({
              _id: id
            }));

          case 3:
            brand = _context5.sent;
            logo = brand.logo;
            _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description;
            _context5.prev = 6;

            if (!req.files) {
              _context5.next = 11;
              break;
            }

            _context5.next = 10;
            return regeneratorRuntime.awrap(fileHelper.saveImageAndDeleteImageBrand(req));

          case 10:
            logo = _context5.sent;

          case 11:
            _context5.next = 13;
            return regeneratorRuntime.awrap(Brand.findOne({
              _id: id
            }));

          case 13:
            _brand = _context5.sent;

            if (_brand) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              success: false,
              message: 'Brand not found'
            }));

          case 16:
            _brand.logo = logo;
            _brand.name = name;
            _brand.description = description;
            _context5.next = 21;
            return regeneratorRuntime.awrap(_brand.save());

          case 21:
            return _context5.abrupt("return", res.json({
              success: true,
              message: 'Update successfully'
            }));

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](6);
            console.log(_context5.t0.message);
            return _context5.abrupt("return", res.status(500).json({
              success: false,
              message: _context5.t0.message
            }));

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[6, 24]]);
  }
};