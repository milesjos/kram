var items = require('../models/item');

// Create endpoint /api/items for POSTS
exports.postItems = function(req, res) {
  // Create a new instance of the Item model
  var item = new Item();

  // Set the item properties that came from the POST data
  item.name = req.body.name;
  item.cost = req.body.cost;
  item.quantity = req.body.quantity;

  // Save the item and check for errors
  item.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Item added to the Kram!', data: item });
  });
};

exports.getItems = function(req, res) {
  // Use the Item model to find all item
  Item.find(function(err, items) {
    if (err)
      res.send(err);

    res.json(items);
  });
};

exports.getItem = function(req, res) {
  // Use the Item model to find a specific item
  Item.findById(req.params.item_id, function(err, item) {
    if (err)
      res.send(err);

    res.json(item);
  });
};

exports.putItem = function(req, res) {
  // Use the Item model to find a specific item
  Item.findById(req.params.item_id, function(err, item) {
    if (err)
      res.send(err);

    // Update the existing item attributes
    if (req.body.quantity) {
      item.quantity = req.body.quantity;
    }

    if (req.body.name) {
      item.name = req.body.name;
    }

    if (req.body.cost) {
      item.cost = req.body.cost;
    }

    // Save the item and check for errors
    item.save(function(err) {
      if (err)
        res.send(err);

      res.json(item);
    });
  });
};

exports.deleteItem = function(req, res) {
  // Use the Item model to find a specific item and remove it
  Item.findByIdAndRemove(req.params.item_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Item removed from the kram!' });
  });
};
