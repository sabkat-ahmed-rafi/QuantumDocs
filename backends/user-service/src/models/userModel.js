const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        require: true,
        minLength: 8,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        maxLength: 500,
    },
    socialLinks: {
        type: Object,
        default: {
            linkedin: "",
            twitter: "",
            x: "",
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        Default: Date.now,
    }
})

module.exports = mongoose.model('User', userSchema);