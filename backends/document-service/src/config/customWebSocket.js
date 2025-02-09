const WebSocket = require('ws');
const { updateDocument } = require('../service/documentService');


const setupCustomWebSocket = (server) => {
    const customWS = new WebSocket.Server({ noServer: true, port: 5003 });

    customWS.on('connection', (ws) => {
        console.log('Custom WebSocket connected');

        ws.on('message', (message) => {
            const data = JSON.parse(message); 

            if(data && data.type == 'update' && data.documentId && data.data) {
                const {documentId, data: delta } = data;
                const updatedData = {documentId, updatedData: delta};
                try {
                    updateDocument(updatedData);
                } catch (error) {
                    console.log("Document updating Error: ", error);
                }
            };

        });

        ws.on('error', (err) => {
            console.error('Custom WebSocket error:', err);
        });
    });

};

module.exports = { setupCustomWebSocket };