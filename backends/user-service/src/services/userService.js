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
    const user = User.findOne({uid: userUid});

    if(!user) {
        throw new Error("User not found");
    }
    return user;
}

//search user 
exports.searchUsers = async (searchText) => {

    if (!searchText) {
        throw new Error("Search text is required");
    };

    const query = { email: { $regex: `^${searchText}`, $options: "i" } };
    const users = await User.find(query)

    return users;
} 