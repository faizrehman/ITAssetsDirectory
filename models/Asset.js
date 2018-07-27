// Import required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Asset Schema
const AssetSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  initialpurchasedate: {
    type: Date,
    required: true
  },
  currentowner: {
    type: String,
    required: true
  }
});

module.exports = Asset = mongoose.model("assets", AssetSchema);
