const { Server } = require('socket.io');
const { handleGroupMessage } = require('./handleGroupMessage');
const { checkOngoingCall } = require('./checkOngoingCall');

const initializeSocket = (server) => {
    const io = new Server(server, { 
        cors: {
            origin: "*",
            methods: ['GET', 'POST']
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        handleGroupMessage(io, socket);
        checkOngoingCall(io, socket);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;

};

module.exports = { initializeSocket };