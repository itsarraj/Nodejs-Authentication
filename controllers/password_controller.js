const User = require('../models/User.js');
const fs = require('fs');
const path = require('path');
const nodeMailer = require('../config/nodemailer.js');
const forgetPasswordMailer = require('../mailers/forget_password_mailer.js');
const crypto = require('crypto');
const env = require('../config/environment.js');
const jwt = require('jsonwebtoken');

// GET request to render forget password page
module.exports.forgotPasswordPage = function (req, res) {
    return res.render('forget_password', {
        title: 'forget password Page',
    });
};
// POST request to send reset password link
module.exports.sendResetLink = async function (req, res) {
    let user = await User.findOne({
        email: `${req.body.email}`,
    });
    if (!user) {
        req.flash('error', 'No User Associated with This Email');
        return res.redirect('back');
    }

    const secret = env.JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    // const resetLink = `http://localhost:${env.port}/password/reset-password/${user.id}/${token}`;
    const resetLink = `https://nodejsauth.cyclic.app/password/reset-password/${user.id}/${token}`;

    console.log(resetLink);
    user.resetLink = resetLink;
    forgetPasswordMailer.newResetPassword(user);
    req.flash(
        'success',
        'Email sent - reset password link expires in 15 minutes'
    );

    return res.redirect('back');
};

module.exports.resetpassword = async function (req, res) {
    try {
        const { id, token } = req.params;
        // checking for valid user in db
        let user = await User.findOne({
            _id: id,
        });

        if (id !== user.id) {
            req.flash('error', 'Exipred/Invalid Token');
        }

        // we have a valid id and we have a valid user with this id already
        const secret = env.JWT_SECRET + user.password;
        try {
            const payload = jwt.verify(token, secret);
            req.flash('success', 'Token Verified | Change Password');

            res.render('reset_password', {
                title: 'reset-password',
            });
        } catch (error) {
            req.flash('error', 'Exipred/Invalid Token');
            return res.redirect('/password/forgot-password');
        }
    } catch (error) {
        return res.redirect('/');
    }
};

module.exports.postNewPassword = async function (req, res) {
    const { id, token } = req.params;
    const { password, password2 } = req.body;

    let user = await User.findOne({
        _id: id,
    });

    if (id !== user.id) {
        req.flash('error', 'Exipred/Invalid Token');
    }

    const secret = env.JWT_SECRET + user.password;
    try {
        const payload = await jwt.verify(token, secret);
        if (password !== password2) {
            req.flash('error', 'password & confirm password mismatch');

            return res.redirect('back');
        }
        user.password = password;
        await user.save();
        req.flash('success', 'Passwords are Changed ');

        return res.redirect('/');
    } catch (error) {
        return res.redirect('/');
    }
};

module.exports.resetSigninpassword = async function (req, res) {
    return res.render('reset-signin-password', {
        title: 'reset-signin-password',
    });
};

module.exports.resetSigninpasswordChange = async function (req, res) {
    try {
        const { password, password2 } = req.body;

        let user = await User.findOne({
            _id: req.user._id,
        });

        try {
            if (password !== password2) {
                req.flash('error', 'password & confirm password mismatch');
                return res.redirect('back');
            }
            user.password = password;
            await user.save();
            req.flash('success', 'Passwords are Changed ');
            return res.redirect('back');
        } catch (error) {
            return res.redirect('/');
        }
    } catch (error) {
        return res.redirect('/');
    }
};
