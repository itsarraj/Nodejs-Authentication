const User = require('../models/User.js');
const fs = require('fs');
const path = require('path');
const nodeMailer = require('../config/nodemailer.js');
const forgetPasswordMailer = require('../mailers/forget_password_mailer.js');
const crypto = require('crypto');

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
        // TODO: Flash Invalid Email
        console.log('User not found');
        return res.redirect('back');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expirationDate = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

    // Store the reset token in the database
    // TODO create db code
    //
    const resetLink = `http://localhost:${env.port}/password/reset-password?token=${token}`;
    user.resetLink = resetLink;
    forgetPasswordMailer.newResetPassword(user);
    return res.redirect('back');
    //

    // commentsMailer.newComment(user);

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
    const token = req.query.token;

    let tokenExist = await User.findOne({
        resettoken: token,
    });

    if (!tokenExist || tokenExist.resettokenexpirationDate < Date.now()) {
        return res.status(400).send('Invalid or expired reset token');
    }
    return res.render('reset_password', {
        title: 'reset-password',
    });
};

module.exports.resetPasswordPage = async function (req, res) {
    return res.render('reset_password', {
        title: 'reset-password',
    });
};
module.exports.postNewPassword = async function (req, res) {
    let user = await User.updateOne(
        {
            email: req.body.email,
        },
        { password: req.body.password }
    );
    console.log('updated user ', user);
    return res.redirect('back');
};
