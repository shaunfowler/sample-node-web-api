var passport = require('passport');
var authConfig = require('./auth');

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.log('Serialzed user -', JSON.stringify(user));
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('Deserialized user -', JSON.stringify(user));
        
        // Check if the user exists in our database
        if (authConfig.allowedEmailAddresses.indexOf(user.email) === -1) {
            console.error('User not found in allow list - ', JSON.stringify(user.email));
            done(null, false);
        } else {
            console.info('Validated username and password');
            done(null, user);
        }
    });

    require('./passport.google')();

};