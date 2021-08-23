const express = require("express");
const route = express.Router();
const { createCity } = require("../controllers/city");

route.post("/", createCity);

module.exports = route;
