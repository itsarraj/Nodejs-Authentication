const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User.js');

// auth using passport
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async function (email, password, done) {
            // find the user and establish the identity
            try {
                let user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, {
                        message: 'User not found',
                    });
                }
                await user.comparePassword(password, function (error, isMatch) {
                    if (error) {
                        return done(error);
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Password mismatch',
                        });
                    }
                });
            } catch (error) {
                console.log(`Error in Finding User :: ${error}`);
                return done(error);
            }
        }
    )
);

// serialize and deserialize user functions
// Serialize user functions
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user functions
passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        console.log(`Error in Finding User :: ${error}`);
        return done(error);
    }
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is authenticated or signed in
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated or not signed in
    return res.redirect('/users/sign-in');
};

// TODO: check if

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
