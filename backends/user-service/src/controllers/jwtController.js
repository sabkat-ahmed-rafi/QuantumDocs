const jwtService = require('../services/jwtService')

exports.setJwt = async (res, req) => { 
    try{
        const token = jwtService.generateJwtToken(req.body);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }).send({ success: true })
    } catch(error) {
        console.error("JWT Generation Error:", error.message);
        res.status(400).send({ success: false, message: error.message });
    }
}

exports.clearJwt = async (res, req) => {
    try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (error) {
        res.status(500).send(error);
      }
}