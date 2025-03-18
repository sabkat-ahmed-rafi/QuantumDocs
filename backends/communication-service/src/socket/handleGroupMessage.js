const Message = require('../models/messageModel');

const handleGroupMessage = (io, socket) => {
    socket.on('send-group-message', async ({ sender, groupId, text }) => {
        console.log(sender, groupId, text)
        const message = await Message.create({ text, groupId, sender, readBy: [sender.uid] });

        io.to(groupId).emit('receive-group-message', message);
    });

    socket.on('join-group-message', (groupId) => {
        socket.join(groupId);
    })
}; 

module.exports = { handleGroupMessage };