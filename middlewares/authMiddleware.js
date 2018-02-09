module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('Authentication error');
    }
    return next();
};

