const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.generateJwtToken = async (user) => {
    const { uid, email } = user;

    if (!uid || !email) {
      throw new Error("Invalid user data");
    }

    return jwt.sign(user, config.jwt_secret, { expiresIn: "1d" });  
}