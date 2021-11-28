"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Advertisement = new Schema({
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
  image: {
    type: String,
    required: true,
    "default": ''
  },
  url: {
    type: String,
    required: true,
    "default": ''
  },
  displayOrder: {
    type: String,
    required: true,
    "default": 0
  }
});
module.exports = mongoose.model('Advertisements', Advertisement);