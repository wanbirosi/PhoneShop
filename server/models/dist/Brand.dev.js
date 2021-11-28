"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Brand = new Schema({
  name: {
    type: String,
    required: true,
    "default": ''
  },
  description: {
    type: String,
    required: true,
    "default": ''
  },
  logo: {
    type: String,
    required: true,
    "default": ''
  }
});
module.exports = mongoose.model('Brands', Brand);