const express = require('express');
const {  getDestinations } = require('../controller/travelController');

const router = express.Router();

// destination-i medeelliig avchrah service-e route-tei holboj bn
router.get('/', getDestinations); 
module.exports = router;
