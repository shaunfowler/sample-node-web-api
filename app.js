var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost/items');

var items = require('./api/items.js')(app);

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});
