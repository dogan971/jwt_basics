const express = require("express");
const route = express.Router();
const { getAllUser, addUser, loginUser } = require("../controller/User");
const getAccessToRoute = require("../middleware/authorization/authorization");
route.get("/getAllUser", getAccessToRoute, getAllUser);
route.post("/addUser", addUser);
route.post("/login", loginUser);
module.exports = route;
