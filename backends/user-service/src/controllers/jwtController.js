const jwtService = require('../services/jwtService')

exports.setJwt = async (req, res) => { 
    try{
        const token = await jwtService.generateJwtToken(req.body);
        res.status(200).send({ success: true, token });
    } catch(error) {
        console.error("JWT Generation Error:", error.message);
        res.status(400).send({ success: false, message: error.message });
    }
}
