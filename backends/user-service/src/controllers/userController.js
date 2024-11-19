const userService = require('.././services/userService');


exports.createUser = async (req, res) => {
    try{
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json({ message: "User created successfully" }, { user: newUser });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}