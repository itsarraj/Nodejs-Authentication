// Importing the nodemailer module from '../config/nodemailer'
const nodeMailer = require('../config/nodemailer');

// Exporting a function named 'newResetPassword' as part of the module
exports.newResetPassword = (user) => {
    // Generating an HTML string for the email body by rendering an EJS template
    let htmlString = nodeMailer.renderTemplate(
        { user: user },
        '/forget_password/forget_password.ejs'
    );

    // Logging the email recipient's email address to the console
    console.log('Email Sent To ', user.email);

    // Sending a password reset email using the configured nodemailer transporter
    nodeMailer.transporter.sendMail(
        {
            from: 'competitivedevelopernewsletter@gmail.com',
            to: user.email,
            subject: 'Reset Your Password',
            html: htmlString,
            text: `Click the following link to reset your password: ${user.resetLink}`,
        },
        (err, info) => {
            if (err) {
                // Logging an error message if email sending fails
                console.log('Error in sending email: ', err);
                return;
            }
            // Returning without any action upon successful email sending
            return;
        }
    );
};
