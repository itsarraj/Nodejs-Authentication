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
        // TODO Flash Invalid Email
        console.log('User not found');
        return res.redirect('back');
    }

    const secret = env.JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    const resetLink = `http://localhost:${env.port}/password/reset-password/${user.id}/${token}`;
    console.log(resetLink);
    res.send('password reset mail sent successfully');
    // user.resetLink = resetLink;
    // forgetPasswordMailer.newResetPassword(user);

    // return res.redirect('back');

    //     The default priority map is as follows:

    // {
    //     low: 10
    //   , normal: 0
    //   , medium: -5
    //   , high: -10
    //   , critical: -15
    // };

    // let job = queue.create('pass-reset-mail', user).save(function (err) {
    //     if (err) {
    //         console.log('Error in sending to the queue', err);
    //         return;
    //     }
    //     // console.log('user ', user);
    //     console.log('job enqueued', job.id);
    // });
    // return res.redirect('back');

    // return res.redirect('/users/sign-in');
};

module.exports.resetpassword = async function (req, res) {
    const { id, token } = req.params;
    // checking for valid user in db
    let user = await User.findOne({
        _id: id,
    });

    if (id !== user.id) {
        res.send('invalid_user');
    }

    // we have a valid id and we have a valid user with this id already
    const secret = env.JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token, secret);
        res.render('reset_password', {
            title: 'reset-password',
        });
    } catch (error) {
        // todo flash error
        console.log(error);
        // res.send(error);
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
        res.send('invalid_user');
    }

    const secret = env.JWT_SECRET + user.password;
    try {
        const payload = await jwt.verify(token, secret);
        if (password !== password2) {
            return res.redirect('back');
        }
        // user.password = password;
        user.password = password;
        await user.save();
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        // res.send(error);
        // todo flash error
        return res.redirect('/');
    }
};

module.exports.resetSigninpassword = async function (req, res) {
    return res.render('reset-signin-password', {
        title: 'reset-signin-password',
    });
};

module.exports.resetSigninpasswordChange = async function (req, res) {
    const { password, password2 } = req.body;

    let user = await User.findOne({
        _id: req.user._id,
    });

    try {
        if (password !== password2) {
            //todo flash password & confirm password wrong
            return res.redirect('back');
        }
        user.password = password;
        await user.save();
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        // todo: flash
        return res.redirect('/');

        // res.send(error);
    }
};
