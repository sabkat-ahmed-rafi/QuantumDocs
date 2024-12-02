const User = require('.././models/userModel');

// Create a user 
exports.createUser = async (userData) => {
    if(!userData) {
        throw new Error("User data not found")
    }

    const user = new User(userData);
    return await user.save();
}

// Get user by Email 
exports.getUserByEmail = async (userEmail) => {
    return await User.findOne({email: userEmail});
}

//get a user by id
exports.getUserById = async (userUid) => {
    if(!userUid) {
        throw new Error("User id is required");
    }
    const user = User.findById(userUid);

    if(!user) {
        throw new Error("User not found");
    }
    return user;
}