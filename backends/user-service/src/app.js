const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors({origin: [config.frontend]}));

// Routes 
app.use('/api/users', userRoutes);
// app.use('/api/jwt');


module.exports = app;