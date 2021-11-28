"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Category = new Schema({
  name: {
    type: String,
    required: true,
    "default": ''
  },
  description: {
    type: String,
    required: true,
    "default": ''
  }
});
module.exports = mongoose.model('Categories', Category);