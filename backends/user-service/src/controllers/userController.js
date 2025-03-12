const userService = require('.././services/userService');


exports.createUser = async (req, res) => {
    try{
        const userData = req.body;
        const isExist = await userService.getUserByEmail(userData.email)
        if(isExist) {
            return res.status(201).json({ message: "User already exists" });
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

        // Stopping users to access other user's data 
        if(req.user?.uid !== uid) {
            return res.status(403).send({ message: "You cannot access another user's data" })
        }
        const user = await userService.getUserById(uid);
        return res.status(200).json({ message: "User found", user: user })
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

exports.searchUsers = async (req, res) => {
    try {
        const searchText = req.query.search;
        if(searchText) {
            const users = await userService.searchUsers(searchText);
            res.status(200).json({ message: "Users found", users: users });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addToFavourite = async (req, res) => {
    try {
        const {documentId, userEmail} = req.body;
        if(userEmail) {
            const add = await userService.addToFavourite(documentId, userEmail);
            res.status(200).json({add});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.removeFavourite = async (req, res) => {
    try {
        const {documentId, userEmail} = req.body;
        if(userEmail) {
            const remove = await userService.removeFavourite(documentId, userEmail);
            res.status(200).json({remove});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getFavourite = async (req, res) => {
    try {
        const {documentId, userEmail} = req.query;
        
        if(userEmail) {
            const get = await userService.getFavourite(documentId, userEmail);
            res.status(200).json({get});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateProfile = async (req, res) => {
   try {
    const data = req.body.data;
    const user = req.user;
    if(data && user) {
        const updatedProfile = await userService.updateProfile(data, user);
        res.status(200).json({ updatedProfile });
    }
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
}