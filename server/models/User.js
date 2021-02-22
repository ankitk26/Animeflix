const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
    confirmPassword: String,
  },
  { timestamps: true }
);

module.exports = User = model("users", UserSchema);
