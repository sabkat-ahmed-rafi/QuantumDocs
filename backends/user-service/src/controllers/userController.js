const userService = require('.././services/userService');


exports.createUser = async (req, res) => {
    try{
        const userData = req.body;
        const isExist = userService.getUserByEmail(userData.email)
        if(isExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await userService.createUser(userData);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getUserById = async (req, res) => {
    try{
        const uid = req.params.uid;
        const user = await userService.getUserById(uid);
        res.status(200).json({ message: "User found", user: user })
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}