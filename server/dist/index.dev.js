"use strict";

var express = require("express");

var cors = require("cors"); // upload file image


var fileUpload = require("express-fileupload");

var mongooseConfig = require("./config/mongooseConfig");

var router = require("./routes/index");

var Cookies = require("cookies");

var cookieParser = require("cookie-parser");

var app = express();
mongooseConfig.connect(); // upload file image

app.use(express.urlencoded({
  extended: true
}));
app.use(fileUpload());
app.use(cookieParser());

var session = require("express-session");

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "1234567abc",
  cookie: {
    maxAge: 60000
  }
}));
app.use(express["static"]("public"));
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(3000, function () {
  return console.log("http://localhost:3000");
});