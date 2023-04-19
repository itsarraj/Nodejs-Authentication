const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        // Email of the user
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // Password of the user
        password: {
            type: String,
            required: true,
        },
        // Name of the user
        name: {
            type: String,
            required: true,
        },
        resettoken: {
            type: String,
        },
        resettokenexpirationDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.comparePassword = function (userPass, cb) {
    try {
        bcrypt.compare(userPass, this.password, function (err, result) {
            if (err) {
                return cb(err);
            }
            console.log('user compare pass', result);

            return cb(null, result);
        });
    } catch (e) {
        console.log(e);
    }
};

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        console.log('this.password ', this.password);
        console.log('salt ', salt);
        bcrypt.hash(this.password, salt, (err, result) => {
            console.log('result ', result);
            this.password = result;
            console.log('This password ', this.password);
            return next();
        });
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
