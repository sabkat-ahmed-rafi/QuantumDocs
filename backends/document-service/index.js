const app = require('./src/app');
const config = require('./src/config/config');
const connectDB = require('./src/utils/dbConnection');
const { setupYWebSocket } = require('./src/config/yWebSocket');
const { setupCustomWebSocket } = require('./src/config/customWebSocket');

const PORT = config.port;

connectDB();

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Document service is running on port ${PORT}`);
})

// WebSocket server
setupCustomWebSocket(server);
setupYWebSocket(server);
