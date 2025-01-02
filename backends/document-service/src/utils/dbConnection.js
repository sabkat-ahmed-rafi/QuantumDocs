const mongoose = require('mongoose');
const config = require('../config/config');


const connectDB = async () => {
    try{
        await mongoose.connect(config.mongodb_uri);
        console.log('MongoDB connected successfully');
    } catch(error) {
        console.error('MongoDB connection error:', error);
        process.exit();
    }
}

module.exports = connectDB;