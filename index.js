const express = require('express');
const app = express();
const env = require('./config/environment');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = env.port;
const bcrypt = require('bcrypt');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocal = require('./config/passport-local-strategy');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
    session({
        name: 'NodeAuthentication',
        secret: env.session_cookie_key,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 10 * 60 * 1000,
        },
        store: MongoStore.create(
            {
                mongoUrl: `mongodb://127.0.0.1/${env.db}`,
                mongooseConnection: db,
                autoRemove: 'disabled',
            },
            function (err) {
                console.log(err || 'connect-mongodb setup ok');
            }
        ),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());

app.use('/', require('./routes/index'));

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error running server: ${err}`);
    }
    console.log(`Server running on port ${port}`);
});
