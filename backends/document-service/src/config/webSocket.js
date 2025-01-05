const WebSocket = require('ws')
const yWebSocket = require('y-websocket');


const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws, req) => {
        yWebSocket.setupWSConnection(ws, req);
    });
};

module.exports = { setupWebSocket };