"use strict";

var express = require('express');

var orderDetailService = require('../services/orderDetail.service');

var verifyToken = require('../middleware/auth');

var route = express.Router(); // @route GET /api/orders/:orderId
// @desc Get all orders
// @access Private

route.get('/:orderId', verifyToken, orderDetailService.getAllByOrderId); // @route GET /api/orders/
// @desc Get all orders by user id
// @access Private

route.get('/', verifyToken, orderDetailService.getAllByUserId); // @route POST /api/orders
// @desc Create orderDetail
// @access Private

route.post('/', verifyToken, orderDetailService.create); // @route DELETE /api/orders/:id
// @desc Delete orderDetail
// @access Private

route["delete"]('/:id', verifyToken, orderDetailService["delete"]);
module.exports = route;