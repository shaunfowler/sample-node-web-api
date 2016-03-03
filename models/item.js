var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Item', itemSchema);