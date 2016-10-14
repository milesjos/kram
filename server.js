var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var Item = require('./models/item');
var itemController = require('./controllers/item');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

var app = express();

// Connect to the kram MongoDB
mongoose.connect('mongodb://localhost:27017/MHacks8');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    message: "index page"
  });
});

// Create endpoint handlers for /items
router.route('/items')
  .post(authController.isAuthenticated, itemController.postItems)
  .get(authController.isAuthenticated, itemController.getItems);

// Create endpoint handlers for /items/:item_id
router.route('/items/:item_id')
  .get(authController.isAuthenticated, itemController.getItem)
  .put(authController.isAuthenticated, itemController.putItem)
  .delete(authController.isAuthenticated, itemController.deleteItem);

// Create endpoint handlers for /users
router.route('/users')
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/signup')
  .post(userController.signupUser);

router.route('/login')
  .post(userController.loginUser);

// Create endpoint handlers for /users/:user_id
router.route('/users/:user_id')
  .get(authController.isAuthenticated, userController.getUser);

// Register all our routes with /api
app.use('/api', router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
