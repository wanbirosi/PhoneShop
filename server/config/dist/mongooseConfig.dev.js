"use strict";

require('dotenv').config();

var mongoose = require('mongoose'); // import module vào để sử dụng được


module.exports = {
  connect: function connect() {
    return regeneratorRuntime.async(function connect$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(mongoose.connect("mongodb+srv://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@phoneshop.qx0bo.mongodb.net/").concat(process.env.DB_NAME, "?retryWrites=true&w=majority"), {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
              useCreateIndex: true
            }));

          case 3:
            console.log('successfully!');
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 6]]);
  }
};