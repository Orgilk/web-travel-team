const express = require('express');
const router = express.Router();

// Mock database
let orders = [];

// Endpoint to save the booking
router.post('/', (req, res) => {
    const { duration, hotel, meal, transport, adults, sumPrice, totalPrice, destination } = req.body;

    // Validate the booking object
    if (!duration || !hotel || !meal || !transport || !adults || !sumPrice || !totalPrice || !destination) {
        return res.status(400).json({ message: 'Захиалгын мэдээлэл дутуу байна.' });
    }

    // Save to the mock database
    const newBooking = { duration, hotel, meal, transport, adults, sumPrice, totalPrice, destination, id: Date.now() };
    orders.push(newBooking);

    res.status(201).json({ message: 'Захиалга амжилттай хадгалагдлаа!', booking: newBooking });
});

// Endpoint to fetch all orders
router.get('/', (req, res) => {
    res.status(200).json(orders);
});

module.exports = router;
