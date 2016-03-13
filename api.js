var _ = require('lodash');
var passport = require('passport');
var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.error('Attempt to access protected API was rejected');
    res.redirect('/?error=not-authenticated');
}

module.exports = function (app, Model, apiPath) {

    router.route('/' + apiPath)
        .get(
            ensureAuthenticated,
            function (req, res) {
                Model.find(function (error, updates) {
                    updates.push(req.user);
                    res.json(updates);
                });
            });

    router.route('/' + apiPath + '/:id')
        .get(
            ensureAuthenticated,
            function (req, res) {
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
            })
        .post(
            ensureAuthenticated,
            function (req, res) {
                var update = new Model(req.body);
                update.save(function (error) {
                    if (error) {
                        res.json({ error: error });
                        return;
                    }
                    res.json({ info: 'created' });
                });
            })
        .put(
            ensureAuthenticated,
            function (req, res) {
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
            })
        .delete(
            ensureAuthenticated,
            function (req, res) {
                Model.findByIdAndRemove(req.params.id, function (error) {
                    if (error) {
                        res.json({ error: error })
                        return;
                    }
                    res.json({ info: 'removed' });
                });
            });

    return router;
};