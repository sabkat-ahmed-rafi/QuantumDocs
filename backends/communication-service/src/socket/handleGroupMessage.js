const handleGroupMessage = (io, socket) => {
    socket.on('send-group-message', ({ sender, groupId, message }) => {
        console.log(`Group ${groupId} received message from ${sender}: ${message}`);

        io.to(groupId).emit('receive-group-message', { sender, message })
    });

    socket.on('join-group-message', (groupId) => {
        socket.join(groupId);
        console.log(`User ${socket.id} joined group ${groupId}`);
    })
}; 

module.exports = { handleGroupMessage };