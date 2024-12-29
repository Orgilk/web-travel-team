const express = require('express');
const { getTrips, addTrip, deleteTrip } = require('../controller/travelController');

const router = express.Router();

//order-n medeelel avchrah zam
router.get('/', getTrips); 
// order uusgeh zam
router.post('/', addTrip); 
// order ustgah zam
router.delete('/', deleteTrip); 
module.exports = router;
