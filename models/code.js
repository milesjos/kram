// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var CodeSchema  = new mongoose.Schema({
  value: { type: String, required: true },
  redirectUri: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

CodeSchema.pre('save', function(callback) {
  var value = this;

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(value, salt, null, function(err, hash) {
      if (err) return callback(err);
      value = hash;
      callback();
    });
  });
});

// Export the Mongoose model
module.exports = mongoose.model('Code', CodeSchema);
