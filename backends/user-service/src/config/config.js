require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    mongodb_uri: process.env.MONGODB_URI || "",
    frontend: process.env.FRONTEND,
    jwt_secret: process.env.JWT_SECRET,
    internal_service_key: process.env.INTERNAL_SERVICE_KEY
};