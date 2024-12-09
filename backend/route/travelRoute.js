const express = require('express');
const { getTrips, addTrip, deleteTrip } = require('../controller/travelController');

const router = express.Router();

// Define routes
router.get('/', getTrips);  // Fetch all trips
router.post('/', addTrip); // Add a new trip
router.delete('/', deleteTrip); 
module.exports = router;
