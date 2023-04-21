result = require('dotenv').config();

const development = {
    name: process.env.NodeJsAuthname,
    port: process.env.NodeJsAuthport,
    asset_path: process.env.NodeJsAuthasset_path,
    session_cookie_key: process.env.NodeJsAuthsession_cookie_key,
    db: process.env.NodeJsAuthdb,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NodeJsAuthsmtpuser,
            pass: process.env.NodeJsAuthsmtppass,
        },
    },

    google_client_id: process.env.NodeJsAuthgoogle_client_id,
    google_client_secret: process.env.NodeJsAuthgoogle_client_secret,
    google_call_back_url: process.env.NodeJsAuthgoogle_call_back_url,
};

module.exports = development;
