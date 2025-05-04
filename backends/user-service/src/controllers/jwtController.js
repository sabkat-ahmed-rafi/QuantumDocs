const jwtService = require('../services/jwtService')

exports.setJwt = async (req, res) => { 
    try{
        const token = await jwtService.generateJwtToken(req.body);
        res.cookie("token", token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        }).send({ success: true })
    } catch(error) {
        console.error("JWT Generation Error:", error.message);
        res.status(400).send({ success: false, message: error.message });
    }
}

exports.clearJwt = async (req, res) => {
    try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (error) {
        res.status(500).send("Something wrong can't clear the jwt");
      }
}