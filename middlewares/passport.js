const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./../db_models');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((userId, done) => {
        models.user.findById(userId, {include: models.role}).then((user) => {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            const user = await models.user.findOne({
                where: {email},
                include: models.auth
            });
            if (!user) {
                return done(null, false);
            }
            const passwordMatch = await bcrypt.compare(password, user.auth.hash);
            if (!passwordMatch) {
                return done(null, false);
            }
            return done(null, user);
        }
    ));
    next();
};

