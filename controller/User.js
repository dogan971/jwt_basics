const expressAsyncHandler = require("express-async-handler");
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
module.exports = { getAllUser, addUser };
