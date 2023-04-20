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
    res.send(req.params);
    // let tokenExist = await User.findOne({
    //     resettoken: token,
    // });

    // if (!tokenExist || tokenExist.resettokenexpirationDate < Date.now()) {
    //     console.log('resetpassword tokenExist inside if ', tokenExist);

    //     return res.status(400).send('Invalid or expired reset token');
    // }
    // return res.redirect('/password/reset-password');
};

module.exports.resetPasswordPage = async function (req, res) {
    return res.render('reset_password', {
        title: 'reset-password',
    });
};
module.exports.postNewPassword = async function (req, res) {
    const token = jwt.verify(token, env.JWT_SECRET);

    let tokenExist = await User.findOne({
        resettoken: token,
    });
    if (!tokenExist) {
        return res.redirect('/');
    }
    let user = await User.updateOne(
        {
            email: req.body.email,
        },
        { password: req.body.password }
    );
    console.log('updated user ', user);
    return res.redirect('back');
};

// middleware
