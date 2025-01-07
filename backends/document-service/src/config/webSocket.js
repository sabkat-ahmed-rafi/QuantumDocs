const WebSocket = require('ws')
const { setupWSConnection } = require('y-websocket/bin/utils.js');


const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws, req) => {
        setupWSConnection(ws, req);
    });
};

module.exports = { setupWebSocket };