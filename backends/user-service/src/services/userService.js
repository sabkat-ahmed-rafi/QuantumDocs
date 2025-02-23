const User = require('.././models/userModel');
const userFavDocModel = require('../models/userFavDocModel');

// Create a user 
const createUser = async (userData) => {
    if(!userData) {
        throw new Error("User data not found")
    }

    const user = new User(userData);
    return await user.save();
}

// Get user by Email 
const getUserByEmail = async (userEmail) => {
    return await User.findOne({email: userEmail});
}

//get a user by id
const getUserById = async (userUid) => {
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
const searchUsers = async (searchText) => {

    if (!searchText) {
        throw new Error("Search text is required");
    };

    const query = { email: { $regex: `^${searchText}`, $options: "i" } };
    const users = await User.find(query).select("name email profilePicture").limit(5);

    return users;
} 

const addToFavourite = async (userEmail, documentId) => {
    try {
        await userFavDocModel.findOneAndUpdate(
            { email: userEmail }, 
            { $addToSet: { favouriteDocuments: documentId } },
            { upsert: true }
        );
        return { success: true, message: "Added to favourite" };
    } catch (error) {
        return { success: false, message: "Something went wrong" }; 
    }
}

const removeFavourite = async (userEmail, documentId) => {
    try {
        await userFavDocModel.findOneAndUpdate(
            { email: userEmail },
            { $pull: { favouriteDocuments: documentId } }
        )
        return { success: true, message: "Removed from favourite" };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    searchUsers,
    addToFavourite,
    removeFavourite
}