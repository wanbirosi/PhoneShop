"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var OrderDetail = new Schema({
  count: {
    type: Number,
    required: true,
    "default": 0
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  }
});
module.exports = mongoose.model('OrderDetails', OrderDetail);