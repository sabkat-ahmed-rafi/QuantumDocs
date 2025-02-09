const WebSocket = require('ws')
const { setupWSConnection } = require('y-websocket/bin/utils.js');


const setupYWebSocket  = (server) => {
    const yws = new WebSocket.Server({ server });
    yws.on('connection', (ws, req) => {
        setupWSConnection(ws, req);
    });

};

module.exports = { setupYWebSocket  };