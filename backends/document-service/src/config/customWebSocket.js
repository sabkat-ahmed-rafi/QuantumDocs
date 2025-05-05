const WebSocket = require('ws');
const { updateDocument, updateDocTitle, updateThumbnail } = require('../service/documentService');


const setupCustomWebSocket = (server) => {
    const customWS = new WebSocket.Server({ noServer: true });

    customWS.on('connection', (ws) => {
        console.log('Custom WebSocket connected');

        ws.on('message', (message) => {
            const data = JSON.parse(message); 

            if(data && data.type == 'thumbnailUpdate' && data.data.thumbnailURL) {
                try {
                    const documentId = data.documentId;
                    const thumbnailURL = data.data.thumbnailURL;
                    updateThumbnail(documentId, thumbnailURL)
                } catch (error) {
                    console.log("Thumbnail updating Error: ", error);
                }
            }


            if(data && data.type == 'titleUpdate' && data.documentId && data.newTitle) {
                try {
                    updateDocTitle( data.documentId, data.newTitle );
                } catch (error) {
                    console.log("Document Title updating Error: ", error);
                }
            };


            if(data && data.type == 'update' && data.documentId && data.data) {
                const oldData = data.data.parseJsonOldDelta;
                const newData = data.data.parseJsonNewDelta;
                const { documentId } = data;
                const updatedData = { documentId, oldData, newData };
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