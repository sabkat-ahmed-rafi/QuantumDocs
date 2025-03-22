const Message = require('../models/messageModel');
const { markAsRead } = require('../services/messageService');

const handleGroupMessage = (io, socket) => {
    socket.on('send-group-message', async ({ sender, groupId, text }) => {
        console.log(sender, groupId, text)
        const message = await Message.create({ text, groupId, sender, readBy: [sender.uid] });
        const senderUid = sender.uid;
        const count = 1;
        io.to(groupId).emit('receive-group-message', message);
        io.to(groupId).emit('receive-unread-group-message', { count, senderUid });
    });

    socket.on('group-message-mark-as-read', async ({ userId, groupId }) => {
        try {
            await markAsRead(userId, groupId);
            return { success: true, message: "Marked as read" };
        } catch {
            return { success: false, message: error.message };
        }
    });

    socket.on('join-group-message', (groupId) => {
        socket.join(groupId);
    });
}; 

module.exports = { handleGroupMessage };