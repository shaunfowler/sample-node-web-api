var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var authConfig = require('./auth');

var strategySettings = {
    clientID: authConfig.google.clientID,
    clientSecret: authConfig.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
};

module.exports = function (app) {

    passport.use(new GoogleStrategy(strategySettings,
        function (req, accessToken, refreshToken, profile, done) {
            // Build a user object, from the google profile result
            // This user object will be contained in the request context
            var user = {
                id: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName
            };
            done(null, user);
        }));

}