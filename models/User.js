const mongoose = require('mongoose');
const argon2 = require('argon2');
const crypto = require('crypto');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
    }

});

userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await argon2.hash(this.password);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    try {
        return await argon2.verify(this.password, enteredPassword);
    } catch (error) {
        return false;
    }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
