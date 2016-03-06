var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

// New express app
var app = express();

// Body parse for JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Map API routes
require('./api')(app, require('./models/item.js'), 'items');

// Listen for HTTP requests
var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});