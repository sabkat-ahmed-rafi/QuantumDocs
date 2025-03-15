const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const config = require('./config/config');

const app = express();

// Middlewares 
app.use(cookieParser())
app.use(express.json());
app.use(cors({
        origin: [config.frontend],
        credentials: true,
    })
);

// Routes 



module.exports = app;