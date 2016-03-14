var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var router = express.Router();

// New express app
var app = express();

// Route definitions
var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/user');
var apiItemRoutes = require('./routes/api')(app, require('./models/item.js'), 'items');

// Allow parsing of JSON from request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use express sessions
app.use(session({ secret: 'e68f7c19-c864-47d7-967f-e86ba6d8e636' }));

// Setup auth strategies
require('./config/passport')(app);

// Map routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', apiItemRoutes);
app.use('/', express.static(__dirname + '/app'));

// Listen on port 3000
var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});