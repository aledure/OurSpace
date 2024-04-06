// IMPORTS
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    userImage: {
        type: String
    },
    posts: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }
});

module.exports = mongoose.model('User', userSchema);