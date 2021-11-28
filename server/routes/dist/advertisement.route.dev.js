"use strict";

var express = require('express');

var advertisementService = require('../services/advertisement.service');

var verifyToken = require('../middleware/auth');

var route = express.Router(); // @route GET /api/advertisements
// @desc Get all advertisements
// @access Public

route.get('/', advertisementService.getAll); // @route GET /api/advertisements/:id
// @desc Get advertisement by id
// @access Public

route.get('/:id', advertisementService.getById); // @route POST /api/advertisements/
// @desc Create advertisement
// @access Private

route.post('/', verifyToken, advertisementService.create); // @route DELETE /api/advertisements/:id
// @desc Delete advertisement by id
// @access Private

route["delete"]('/:id', verifyToken, advertisementService["delete"]); // @route PUT /api/advertisements/:id
// @desc Update advertisement by id
// @access Private

route.put('/:id', verifyToken, advertisementService.update);
module.exports = route;