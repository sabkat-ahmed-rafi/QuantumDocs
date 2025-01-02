const app = require('./src/app');
const config = require('./src/config/config');
const connectDB = require('./src/utils/dbConnection');

const PORT = config.port;

connectDB();

app.listen(PORT, () => {
    console.log(`Document service is runnign on port ${PORT}`);
})