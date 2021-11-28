"use strict";

var express = require('express');

var brandService = require('../services/brand.service');

var verifyToken = require('../middleware/auth');

var route = express.Router(); // @route GET /api/brands
// @desc Get all brands
// @access Public

route.get('/', brandService.getAll); // @route GET /api/brands/:id
// @desc Get brand by id
// @access Public

route.get('/:id', brandService.getById); // @route POST /api/brands/
// @desc Create brand
// @access Private

route.post('/', verifyToken, brandService.create); // @route DELETE /api/brands/:id
// @desc Delete brand by id
// @access Private

route["delete"]('/:id', verifyToken, brandService["delete"]); // @route PUT /api/brands/:id
// @desc Update brand by id
// @access Private

route.put('/:id', verifyToken, brandService.update);
module.exports = route;