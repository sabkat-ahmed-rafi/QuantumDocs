const User = require('.././models/userModel');

// Create a user 
exports.createUser = async (userData) => {
    if(!userData) {
        throw new Error("User data not found")
    }

    const user = new User(userData);
    return await user.save();
}

//get a user by id
exports.getUserById = async (userId) => {
    if(!userId) {
        throw new Error("User id is required");
    }
    const user = User.findById(userId);

    if(!user) {
        throw new Error("User not found");
    }
    return user;
}