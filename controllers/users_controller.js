const User = require('../models/User.js');
const fs = require('fs');
const path = require('path');
const nodeMailer = require('../config/nodemailer.js');
const forgetPasswordMailer = require('../mailers/forget_password_mailer.js');
const crypto = require('crypto');

//  Render the signup page
module.exports.signup = function (req, res) {
    // if (req.isAuthenticated()) {
    //     return res.redirect(`/users/profile/${req.user.id}`);
    // }

    return res.render('user_sign_up', {
        title: 'signup',
    });
};
//  Render the signin page
module.exports.signin = function (req, res) {
    // if (req.isAuthenticated()) {
    //     return res.redirect(`/users/profile/${req.user.id}`);
    // }
    return res.render('user_sign_in', {
        title: 'signin',
    });
};

// get the signup data
module.exports.createAccount = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (req.body.password != req.body.confirm_password) {
            // TODO: Flash "Password & Confirm Password Does Not Match"
            console.log('wrong password and confirm password');
            return res.redirect('back');
        }

        if (!user) {
            await User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
            });

            // TODO: Flash "User Created"
            console.log('user created');
            return res.redirect('/users/sign-in');
        } else {
            // TODO: Flash "User Already Exists"
            console.log('user exists');

            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error to fecting sigining up page', error);
        return res.redirect('back');
    }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    // TODO: Flash "CREATED SESSION"
    return res.redirect('/');
};

// log out the user
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return res.redirect('back');
        } else {
            // TODO: Flash "User Log Out"
            return res.redirect('/');
        }
    });
};
