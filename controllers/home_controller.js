const User = require('../models/User.js');
const fs = require('fs');
const path = require('path');

module.exports.home = async function (req, res) {
    const user = await User.findById(req.params.id);

    return res.render('home', {
        title: 'NodeAuthentication Home',
    });
};
