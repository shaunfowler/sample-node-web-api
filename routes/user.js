var express = require('express');
var passport = require('passport');
var authMiddleware = require('../authMiddleware');
var router = express.Router();

router.route('/')
    .get(
        authMiddleware,
        function (req, res) {
            // Return the session user as JSON
            res.json(req.user);
        });

module.exports = router;