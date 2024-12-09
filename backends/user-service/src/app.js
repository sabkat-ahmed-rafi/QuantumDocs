const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const jwtRoutes = require('./routes/jwtRoutes')

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors({origin: [config.frontend]}));

// Routes 
app.use('/api/users', userRoutes);
app.use('/api', jwtRoutes);


module.exports = app;