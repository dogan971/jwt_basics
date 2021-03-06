const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Provide A Name"],
  },
  email: {
    type: String,
    required: true,
    unique: true, // bir e mail bir defa
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please Provide valid e-mail",
    ], // bu email reg ex e eşleşmesi lazm
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please provide a password"],
    minlength: [6, "Please provide a password with min 6 length"],
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return console.error(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return console.error(err);
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.generateJWTFromUser = function () {
  const { PRIVATE_KEY, JWT_EXPIRE } = process.env;
  const payload = { id: this._id, name: this.name };
  const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: JWT_EXPIRE });
  return token;
};
module.exports = mongoose.model("User", UserSchema);
