const express = require("express");
const route = express.Router();
const { getAllUser, addUser } = require("../controller/User");
route.get("/getAllUser", getAllUser);
route.post("/addUser",addUser)
module.exports = route;
