// Import required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isadmin:{
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
