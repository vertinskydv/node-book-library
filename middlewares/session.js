const session = require('express-session');
const sessionSecret = require('./../global/config').secret;

module.exports = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
});
