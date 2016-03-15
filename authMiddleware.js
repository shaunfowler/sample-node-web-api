module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.error('Attempt to access protected API was rejected');
    res.send(401);
};