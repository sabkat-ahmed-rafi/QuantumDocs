const messageService = require('../services/messageService');

exports.getAllMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const allMessagesResult = await messageService.getMessages(groupId, page, limit);
        res.status(200).json({ allMessagesResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUnreadMessagesCount = async (req, res) => {
    try {
        const { userId, groupId } = req.params;
        const countResult = await messageService.getUnreadMessagesCount(userId, groupId);
        res.status(200).json({ countResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}