const app = require('./src/app');
const config = require('./src/config/config');
const connectDB = require('./src/utils/dbConnection');
const { setupYWebSocket } = require('./src/config/yWebSocket');
const { setupCustomWebSocket } = require('./src/config/customWebSocket');
const http = require('http');

const PORT = config.port;

connectDB();

const server = http.createServer(app);


// WebSocket server
const customWS = setupCustomWebSocket();
const yws = setupYWebSocket();

server.on('upgrade', (req, socket, head) => {
    if (req.url === '/custom-ws') {
      customWS.handleUpgrade(req, socket, head, (ws) => {
        customWS.emit('connection', ws, req);
      });
    } else if (req.url.startsWith('/yjs')) {
      yws.handleUpgrade(req, socket, head, (ws) => {
        yws.emit('connection', ws, req);
      });
    } else {
      socket.destroy(); // Reject unknown upgrade paths
    }
  });

server.listen(PORT, () => {
    console.log(`Document service is running on port ${PORT}`);
})