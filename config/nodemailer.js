const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');
let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    console.log(data);
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),

        function (err, html) {
            if (err) {
                console.error(err);
            }
            mailHTML = html;
        }
    );
    return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate,
};
