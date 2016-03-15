var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/#/',
        failure: '/?error=google-auth-failed'
    }));

router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.email']
    }));

router.route('/logout')
    .get(
        function (req, res) { 
            console.log('Logging out user -', JSON.stringify(req.user));
            req.logout();
            res.redirect('/?info=logged-out');
        });

module.exports = router;