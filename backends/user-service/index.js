const app = require('./src/app');
const config = require('./src/config/config')
const connectDB = require('./src/utils/dbConnection')

const PORT = config.port;

connectDB();

app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});