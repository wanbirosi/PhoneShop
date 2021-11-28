"use strict";

var express = require("express");

var productSessionService = require("./../services/productSession.service");

var verifyToken = require("./../middleware/auth");

var route = express.Router(); // @route GET /api/products
// @desc Get all products
// @access Public

route.get("/", productSessionService.getAll); // @route GET /api/products/:id
// @desc Get product by id
// @access Public

route.get("/:id", productSessionService.add); // @route DELETE /api/products/:id
// @desc Delete product by id
// @access Private

route["delete"]("/:id", verifyToken, productSessionService["delete"]); // @route PUT /api/products/:id
// @desc Update product by id
// @access Private
//route.put('/:id', verifyToken, productSessionService.update)

module.exports = route;