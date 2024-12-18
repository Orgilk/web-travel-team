const express = require('express');
const cors = require('cors');
const tripRoutes = require('./route/travelRoute'); // Travel API маршрутууд
const orderRoutes = require('./route/orderRoute'); // Order API маршрутууд
const destinationRoutes = require('./route/destinationRoute'); // Destination API маршрутууд

const app = express();

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', // Орчны хувьсагчаар CORS зохицуулалт
    methods: 'GET,POST,PUT,DELETE',
    optionsSuccessStatus: 200,
}));
app.use(express.json()); // JSON өгөгдөл боловсруулах

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/destinations', destinationRoutes);

// Start server
const PORT = process.env.PORT || 5005;

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
