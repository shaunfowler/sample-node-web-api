var _ = require('lodash');
var Item = require('../models/item.js');

module.exports = function (app) {

    // GET - Read
    app.get('/items/:id', function (req, res) {
        Item.findById(req.params.id, function (error, item) {
            if (error) {
                res.json(error);
                return;
            }

            if (item) {
                res.json(item);
            } else {
                res.json({ info: 'item not found' });
            }
        });
    });

    // GET - Query
    app.get('/items', function (req, res) {
        Item.find(function (error, items) {
            res.json(items);
        });
    });

    // POST - Create
    app.post('/items', function (req, res) {
        var item = new Item(req.body);
        item.save(function (error) {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json({ info: 'item created' });
        });
    });

    // PUT - Update
    app.put('/items/:id', function (req, res) {
        Item.findById(req.params.id, function (error, item) {
            if (error) {
                res.json(error);
                return;
            }

            if (item) {
                _.merge(item, req.body);
                item.save(function (error) {
                    if (error) {
                        res.json({ error: error });
                        return;
                    }

                    res.json({ info: 'item updated' })
                });
            } else {
                res.json({ info: 'item not found' });
            }
        });
    });

    // DELETE - Remove
    app.delete('/items/:id', function (req, res) {
        Item.findByIdAndRemove(req.params.id, function (error) {
            if (error) {
                res.json({ error: error })
                return;
            }
            res.json({ info: 'item removed' });
        });
    });
};