const app = require('./src/app');
const config = require('./src/config/config');
const connectDB = require('./src/utils/dbConnection');
const { setupYWebSocket } = require('./src/config/yWebSocket');
const { setupCustomWebSocket } = require('./src/config/customWebSocket');
const http = require('http');

const PORT = config.port;

connectDB();

const server = http.createServer(app);

// Initialize WebSocket servers
const yWebSocketServer = setupYWebSocket(server);       // returns a ws.Server
const customWebSocketServer = setupCustomWebSocket(server); // returns a ws.Server

server.on('upgrade', (request, socket, head) => {
    const pathname = request.url;

    if (pathname.startsWith('/yjs')) {
        yWebSocketServer.handleUpgrade(request, socket, head, (ws) => {
            yWebSocketServer.emit('connection', ws, request);
        });
    } else if (pathname === '/custom-ws') {
        customWebSocketServer.handleUpgrade(request, socket, head, (ws) => {
            customWebSocketServer.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Document service is running on port ${PORT}`);
})

// WebSocket server
setupCustomWebSocket(server);
setupYWebSocket(server);
