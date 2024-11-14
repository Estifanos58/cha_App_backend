const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    },
    lastSeen: {
        type: Number,
    }
})

;
module.exports = mongoose.model('User',userSchema);