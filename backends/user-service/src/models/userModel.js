const mongoose = require('mongoose');
const hashedPassMiddleware = require('../middlewares/hashedPassMiddleware');
const checkHashedPass = require('../utils/checkHashedPass');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
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
        minLength: 8,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        maxLength: 500,
        default: ""
    },
    socialLinks: {
        type: Object,
        default: {
            linkedin: "",
            instagram: "",
            twitter: "",
        }
    },
}, { timestamps: true }); // This will automatically adds the createdAt and updatedAt field


// Creating index on email field to optimize search queries
userSchema.index({ email: 1 }); // Ascending order index

// middleware and methods
hashedPassMiddleware(userSchema);
checkHashedPass(userSchema);


module.exports = mongoose.model('User', userSchema);