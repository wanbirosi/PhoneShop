"use strict";

require('dotenv').config();

var jwt = require('jsonwebtoken'); // Authorization: Bearer 1sahdkjabsd1iubdakjsbdakjsbdjk


var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.header('Authorization');
  var token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token not found'
    });
  }

  try {
    var decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log('error', error.message);
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = verifyToken;