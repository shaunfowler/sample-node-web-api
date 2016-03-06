var mongoose = require('mongoose');

var connItems = mongoose.createConnection('mongodb://localhost/items');

var itemSchema = mongoose.Schema({
    id: String,
    name: String
});

module.exports = connItems.model('Item', itemSchema);