const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = (req, res, next) => {
    
    
    const token = req.cookies?.token;
    if(!token) {
        return res.status(401).send({ message: "Unauthorized access" });
    }
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if(err) {
            if(err.name == "TokenExpiredError") {
                return res.status(401).send({ error: "sessionExpired" });
            }
            return res.status(401).send({ message: "unauthorized access" });
        }
        req.user = decoded;
        next();
    })
}