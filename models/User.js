const mongoose = require('mongoose')
const validator = require('validator');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "UserName is must"]
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email should be a valid one ']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    apiKey : {
        type: String,
    },
    limit : {
        type: Number,
        default: 5
    },
    usage : {
        type: Number,
        default: 0
    }
});

userSchema.methods.increment_usage = function() {
    this.usage = this.usage + 1;
}

const User = mongoose.model('User', userSchema);

module.exports = User;