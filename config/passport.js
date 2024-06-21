const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};
