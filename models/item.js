// Load required packages
var mongoose = require('mongoose');

// Define our item schema
var ItemSchema   = new mongoose.Schema({
  name: String,
  cost: Number,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Item', ItemSchema);
