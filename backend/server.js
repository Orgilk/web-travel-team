const express = require('express');
const cors = require('cors');
const tripRoutes = require('./route/travelRoute');
const orderRoutes = require('./route/orderRoute');
const destinationRoutes = require('./route/destinationRoute');
// require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', // Restrict origins using environment variables
    methods: 'GET,POST,PUT,DELETE',
    optionsSuccessStatus: 200,
}));
app.use(express.json()); // Replaces body-parser

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/destinations', destinationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });
};

startServer(PORT);