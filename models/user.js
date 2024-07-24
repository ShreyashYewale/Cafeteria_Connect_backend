var mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: 0,    // it is 0 for Employee and 1 for Vendor
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
