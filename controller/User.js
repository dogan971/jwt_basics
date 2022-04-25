const expressAsyncHandler = require("express-async-handler");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/inputHelpers");
const { sendJwtToClient } = require("../helpers/tokenHelpers");
const User = require("../model/User");
const getAllUser = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("+password");
  res.status(200).json({ users });
});
const addUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (name == "" || email == "" || password == "")
    return console.log("Input Error....");
  const user = await User.create({ name, email, password });
  return res.status(200).json({ data: user });
});
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!validateUserInput) return console.error("Please check your credentials");
  const user = await User.findOne({ email }).select("+password");
  if (!comparePassword(password, user.password))
    return console.error("Please check your credentials");
  sendJwtToClient(user, res);
});
module.exports = { getAllUser, addUser, loginUser };
