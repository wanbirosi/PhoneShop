"use strict";

var express = require("express");

var productRoute = require("./product.route");

var categoryRoute = require("./category.route");

var categoryUserRoute = require("./categoryUser.route");

var userRoute = require("./user.route");

var brandRoute = require("./brand.route");

var advertisementRoute = require("./advertisement.route");

var orderRoute = require("./order.route");

var orderDetailRoute = require("./orderDetail.route");

var commentRoute = require("./comment.route");

var productSessionRoute = require("./productSession.route");

var router = express.Router(); // Test routes

router.get("/api/test", function (req, res) {
  return res.send("hello world");
}); // Product Route API

router.use("/api/products/", productRoute); // Category Route API

router.use("/api/categories/", categoryRoute); // CategoryUser Route API

router.use("/api/categoryUsers/", categoryUserRoute); // User Route API

router.use("/api/users/", userRoute); // Brand Route API

router.use("/api/brands/", brandRoute); // Advertisement Route API

router.use("/api/advertisements/", advertisementRoute); // Advertisement Route API

router.use("/api/orders/", orderRoute); // Advertisement Route API

router.use("/api/orderdetails/", orderDetailRoute); // Comment Route API

router.use("/api/comments/", commentRoute); //Product Session Route API

router.use("/api/productSessions/", productSessionRoute);
module.exports = router;