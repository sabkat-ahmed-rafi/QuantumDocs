const Message = require('../models/messageModel');
const { markAsRead } = require('../services/messageService');

const handleGroupMessage = (io, socket) => {
    socket.on('send-group-message', async ({ sender, groupId, text }) => {
        console.log(sender, groupId, text)
        const message = await Message.create({ text, groupId, sender, readBy: [sender.uid] });

        io.to(groupId).emit('receive-group-message', message);
        io.to(groupId).emit('receive-unread-group-message', 1);
    });

    socket.on('group-message-mark-as-read', async ({ userId, groupId }) => {
        await markAsRead(userId, groupId);
    });

    socket.on('join-group-message', (groupId) => {
        socket.join(groupId);
    });
}; 

module.exports = { handleGroupMessage };