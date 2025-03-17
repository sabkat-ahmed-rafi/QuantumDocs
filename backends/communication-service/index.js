const app = require('./src/app');
const config = require('./src/config/config');
const { initializeSocket } = require('./src/socket/socket');
const connectDB = require('./src/utils/dbConnection')

const PORT = config.port;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Communication service running on port ${PORT}`);
});

initializeSocket(server);