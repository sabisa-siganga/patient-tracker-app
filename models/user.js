// importing mongoose
const mongoose = require("mongoose");

// using mongo schema
const Schema = mongoose.Schema;

// defining the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "general",
  },
});

// defining the model
const User = mongoose.model("User", userSchema);
module.exports = User;
