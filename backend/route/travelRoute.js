const express = require('express');
const { getTrips, addTrip } = require('../controller/travelController');

const router = express.Router();

// Define routes
router.get('/', getTrips);  // Fetch all trips
router.post('/', addTrip); // Add a new trip

module.exports = router;
