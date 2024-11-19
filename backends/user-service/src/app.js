const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors());

// Routes 
app.use('/api/users', userRoutes);


module.exports = app;