var passport = require('passport');
var express = require('express');
var authMiddleware = require('../authMiddleware');
var router = express.Router();

module.exports = function (app, Model, apiPath) {

    router.route('/' + apiPath)
        .get(
            authMiddleware,
            function (req, res) {
                Model.find(function (error, updates) {
                    res.json(updates);
                });
            });

    router.route('/' + apiPath + '/:id')
        .get(
            authMiddleware,
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
            authMiddleware,
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
            authMiddleware,
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
            authMiddleware,
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