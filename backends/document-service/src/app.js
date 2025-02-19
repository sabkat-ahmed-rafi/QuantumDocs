const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const documentRoute = require('./routes/documentRoute');
const noteRoute = require('./routes/noteRoute');


const app = express();

// Middlewares 
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [config.frontend],
    credentials: true,
   })
);

// Routes 
app.use('/api/document', documentRoute)
app.use('/api/note', noteRoute)


module.exports = app;