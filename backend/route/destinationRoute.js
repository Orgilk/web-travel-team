const express = require('express');
const {  getDestinations } = require('../controller/travelController');

const router = express.Router();

// Define routes
router.get('/', getDestinations); // get destinations
module.exports = router;
