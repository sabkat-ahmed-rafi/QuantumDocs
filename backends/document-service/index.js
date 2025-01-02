const app = require('./src/app');
const config = require('./src/config/config');

const PORT = config.port;



app.listen(PORT, () => {
    console.log(`Document service is runnign on port ${PORT}`);
})