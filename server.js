var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./models/item');

var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Connect to the kram MongoDB
mongoose.connect('mongodb://localhost:27017/MHacks8');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(require('morgan')('dev'));
var session = require('express-session');
var FileStore = require('session-file-store')(session);

// Create our Express router
var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    message: "index page"
  });
});

// Create a new route with the prefix /items
var itemsRoute = router.route('/items');

// Create endpoint /api/items for POSTS
itemsRoute.post(function(req, res) {
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
});

// Create endpoint /api/items for GET
itemsRoute.get(function(req, res) {
  // Use the Item model to find all item
  Item.find(function(err, items) {
    if (err)
      res.send(err);

    res.json(items);
  });
});

var itemsRoute = router.route('/items/:item_id');

// Create endpoint /api/items/:item_id for GET
itemsRoute.get(function(req, res) {
  // Use the Item model to find a specific item
  Item.findById(req.params.item_id, function(err, item) {
    if (err)
      res.send(err);

    res.json(item);
  });
});

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

// Register all our routes with /api
app.use('/api', router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
