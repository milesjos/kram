// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.signupUser = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      res.status(422);
      res.send(err);
    }

    res.json({ hash: user.password });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.status(422);
      res.send(err);
    }

    res.json(users);
  });
};

// Create endpoint /api/users/:id for GET
exports.getUser = function(req, res) {
  // Find a specific user
  User.findById(req.params.user_id, function(err, item) {
    if (err) {
      res.status(422);
      res.send(err);
    }

    res.json(item);
  });
};


exports.loginUser = function(req, res) {
  User.findOne(req.params.username, function(err, user) {
    if (err) {
      res.status(422);
      res.send(err);
    }

    user.verifyPassword(req.params.password, function(err, isMatch) {
      if (err) {
        res.status(422);
        res.send(err);
      } else if (!isMatch) {
        res.status(422);
        res.message = "Incorrect Password";
        res.send(err);
      } else {
        res.json(user.password);
      }
    });

  });
};
