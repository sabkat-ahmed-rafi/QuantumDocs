const User = require('.././models/userModel');
const userFavDocModel = require('../models/userFavDocModel');
const axios = require('axios');

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

const addToFavourite = async (documentId, userEmail) => {
    try {
        const addedDoc = await userFavDocModel.findOneAndUpdate(
            { email: userEmail }, 
            { $addToSet: { favouriteDocuments: documentId } },
            { upsert: true, new: true }
        );
        if(documentId == addedDoc.favouriteDocuments[0]) {
            return { success: true, message: "Added to favourite" };
        }
    } catch (error) {
        return { success: false, message: "Something went wrong" }; 
    }
}

const removeFavourite = async (documentId, userEmail) => {
    try {
        const removedUser =  await userFavDocModel.findOneAndUpdate(
            { email: userEmail },
            { $pull: { favouriteDocuments: documentId } },
            { new: true }
        )
        if(removedUser.favouriteDocuments.length == 0) {
            return { success: true, message: "Removed from favourite" };
        }
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}

const getFavourite = async (documentId, userEmail) => {
    try {
        const user = await userFavDocModel.findOne(
            { email: userEmail, favouriteDocuments: documentId },
            { favouriteDocuments: { $elemMatch: { $eq: documentId } } },
            { new: true }
        );

        if(documentId == user.favouriteDocuments[0]) {
            return { success: true, message: "The doc is in favourite list" };
        }
        
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}

const updateProfile = async (data, user) => {
   try {

    if (data.linkedin || data.instagram || data.twitter) {
        data.socialLinks = {};
        if (data.linkedin) data.socialLinks.linkedin = data.linkedin;
        if (data.instagram) data.socialLinks.instagram = data.instagram;
        if (data.twitter) data.socialLinks.twitter = data.twitter;
  
        delete data.linkedin;
        delete data.instagram;
        delete data.twitter;
      }

    const updatedUser = await User.findOneAndUpdate(
        { uid : user.uid },
        { $set: data },
        { new: true }
    );
    if(updatedUser._id) {
        
        const updateDocService = {};
        if (data.name) updateDocService.name = data.name;
        if (data.profilePicture) updateDocService.photo = data.profilePicture;
        
        if (Object.keys(updateDocService).length > 0) {
            updateDocService.email = user.email;
            
            await axios.patch(
                `${process.env.document_service}/api/document/updateUser`,
                updateDocService
            );

        };
        return { success: true, message: "User profile updated" };

    }
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
    removeFavourite,
    getFavourite,
    updateProfile
}