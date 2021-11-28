"use strict";

var express = require('express');

var orderService = require('../services/order.service');

var verifyToken = require('../middleware/auth');

var route = express.Router(); // @route GET /api/orders/
// @desc Get all orders
// @access Private

route.get('/', verifyToken, orderService.getAll); // @route GET /api/orders/:id
// @desc Get order by id
// @access Private

route.get('/:id', verifyToken, orderService.getById); // @route DELETE /api/orders/:id
// @desc Delete order
// @access Private

route["delete"]('/:id', verifyToken, orderService["delete"]);
module.exports = route;