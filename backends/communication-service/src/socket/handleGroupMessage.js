const handleGroupMessage = (io, socket) => {
    socket.on('group-message', ({ sender, groupId, message }) => {
        console.log(`Group ${groupId} received message from ${sender}: ${message}`);

        io.to(groupId).emit('group-message', { sender, message })
    });

    socket.on('join-group-message', (groupId) => {
        socket.join(groupId);
        console.log(`User ${socket.id} joined group ${groupId}`);
    })
}; 

module.exports = { handleGroupMessage };