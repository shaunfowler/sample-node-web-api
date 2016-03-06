var _ = require('lodash');

module.exports = function (app, Model, apiPath) {

    // GET - Read
    app.get('/' + apiPath + '/:id', function (req, res) {
        Model.findById(req.params.id, function (error, update) {
            if (error) {
                res.json(error);
                return;
            }

            if (update) {
                res.json(update);
            } else {
                res.json({ info: 'not found' });
            }
        });
    });

    // GET - Query
    app.get('/' + apiPath, function (req, res) {
        Model.find(function (error, updates) {
            res.json(updates);
        });
    });

    // POST - Create
    app.post('/' + apiPath, function (req, res) {
        var update = new Model(req.body);
        update.save(function (error) {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json({ info: 'created' });
        });
    });

    // PUT - Update
    app.put('/' + apiPath + '/:id', function (req, res) {
        Model.findById(req.params.id, function (error, update) {
            if (error) {
                res.json(error);
                return;
            }

            if (update) {
                _.merge(update, req.body);
                update.save(function (error) {
                    if (error) {
                        res.json({ error: error });
                        return;
                    }

                    res.json({ info: 'updated' })
                });
            } else {
                res.json({ info: 'not found' });
            }
        });
    });

    // DELETE - Remove
    app.delete('/' + apiPath + '/:id', function (req, res) {
        Model.findByIdAndRemove(req.params.id, function (error) {
            if (error) {
                res.json({ error: error })
                return;
            }
            res.json({ info: 'removed' });
        });
    });
};