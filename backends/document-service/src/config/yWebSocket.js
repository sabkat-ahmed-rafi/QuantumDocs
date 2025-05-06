const WebSocket = require('ws')
const { setupWSConnection } = require('y-websocket/bin/utils.js');


const setupYWebSocket  = () => {
    const yws = new WebSocket.Server({ noServer: true });
    yws.on('connection', (ws, req) => {
        setupWSConnection(ws, req);
    });
    return yws;
};

module.exports = { setupYWebSocket  };