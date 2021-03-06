"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Order = new Schema({
  address: {
    type: String,
    required: true,
    "default": ''
  },
  phone: {
    type: String,
    required: true,
    "default": ''
  },
  message: {
    type: String,
    "default": ''
  },
  paymentMethod: {
    type: String,
    required: true,
    "default": ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  isDeleted: {
    type: Boolean,
    "default": false
  }
});
module.exports = mongoose.model('Orders', Order);