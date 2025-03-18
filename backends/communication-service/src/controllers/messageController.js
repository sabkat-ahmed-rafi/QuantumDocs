const messageService = require('../services/messageService');

exports.getAllMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        console.log(groupId)
        const allMessagesResult = await messageService.getMessages(groupId);
        res.status(200).json({ allMessagesResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}