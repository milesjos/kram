var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./models/item');
var itemController = require('./controllers/item')

var app = express();

// Connect to the kram MongoDB
mongoose.connect('mongodb://localhost:27017/MHacks8');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

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

// Create endpoint handlers for /items
router.route('/items')
  .post(itemController.postItems)
  .get(itemController.getItems);

// Create endpoint handlers for /items/:item_id
router.route('/items/:item_id')
  .get(itemController.getItem)
  .put(itemController.putItem)
  .delete(itemController.deleteItem);

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
