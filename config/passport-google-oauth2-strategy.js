const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');
const env = require('./environment');

// tell password to use a new strategy for google authentication
passport.use(
    new googleStrategy(
        {
            clientID: env.google_client_id,
            clientSecret: env.google_client_secret,
            callbackURL: env.google_call_back_url,
        },

        async function (accessToken, refeshToken, profile, done) {
            try {
                console.log(profile);
                // find a user
                const user = await User.findOne({
                    email: profile.emails[0].value,
                }).exec();

                // console.log(profile);
                if (user) {
                    // if found , set this user as req.user
                    return done(null, user);
                } else {
                    // if not found , create the user and set it as req.user
                    const user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                        accessToken: accessToken,
                    });
                    return done(null, user);
                }
                //
            } catch (error) {
                if (error) {
                    console.log('error in google strategy-passport', error);
                    return;
                }
            }
        }
    )
);
module.exports = passport;
