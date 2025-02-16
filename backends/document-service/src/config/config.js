require('dotenv').config();

module.exports = {
    port: process.env.PORT || 7000,
    mongodb_uri: process.env.MONGODB_URI || "",
    frontend: process.env.FRONTEND,
    jwt_secret: process.env.JWT_SECRET,
    user_service: process.env.USER_SERVICE,
    internal_service_key: process.env.INTERNAL_SERVICE_KEY
}