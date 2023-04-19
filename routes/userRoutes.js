const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const usersController = require('../controllers/users_controller.js');

// Routes for Signup
router.get('/sign-up', usersController.signup);
router.post('/create-account', usersController.createAccount);

// Routes for Login
router.get('/sign-in', usersController.signin);
router.post(
    '/create-session',
    passport.authenticate('local', {
        failureRedirect: '/users/sign-in',
    }),
    usersController.createSession
);

// Routes for Logout
router.get('/sign-out', usersController.destroySession);

// Routes for Google Authentication
router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/users/sign-in' }),
    usersController.createSession
);

module.exports = router;
