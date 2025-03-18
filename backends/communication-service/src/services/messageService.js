const Message = require('../models/messageModel');

const getMessages = async (groupId) => {
    try {
        const messages = await Message.find({ groupId });
        return { success: true, message: 'Messages found', messages };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}