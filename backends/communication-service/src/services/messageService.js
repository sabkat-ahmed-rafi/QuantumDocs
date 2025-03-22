const Message = require('../models/messageModel');

const getMessages = async (groupId, page = 1, limit = 10) => {
    try {
        const messages = await Message.find({ groupId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
        return { success: true, message: 'Messages found', messages };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
};

const getUnreadMessagesCount = async (userId, groupId) => {
    try {
        const unreadMessageCount = await Message.countDocuments({ groupId, readBy: { $ne: userId } });
        return { success: true, message: "Message counted successfully", unreadMessageCount };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
};

module.exports = {
    getMessages,
    getUnreadMessagesCount
}