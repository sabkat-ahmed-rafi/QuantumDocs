const mongoose = require('mongoose');
const hashedPassMiddleware = require('../middlewares/hashedPassMiddleware');
const checkHashedPass = require('../utils/checkHashedPass');

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
}, { timestamps: true }); // This will automatically adds the createdAt and updatedAt field

// middleware and methods
hashedPassMiddleware(userSchema);
checkHashedPass(userSchema);


module.exports = mongoose.model('UserModel', userSchema);