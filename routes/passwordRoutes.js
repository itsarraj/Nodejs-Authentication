const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const passwordController = require('../controllers/password_controller.js');

// Routes for Forget Password & Reset Password
router.get('/forgot-password', passwordController.forgotPasswordPage);
router.post('/forgot-password', passwordController.sendResetLink);

// Routes for Reset Password page of mail
router.get('/reset-password', passwordController.resetPasswordPage);

// Routes for Reset Password
router.get('/reset-password/:id/:token', passwordController.resetpassword);
router.post('/reset-password', passwordController.postNewPassword);

module.exports = router;
