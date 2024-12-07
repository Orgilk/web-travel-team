const pool = require('../config/db');

// Fetch all trips
const getTrips = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add a new trip
const addTrip = async (req, res) => {
    const { duration, hotel, meal, transport, adults, children, sum_price, total_price, destination } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO orders (duration, hotel, meal, transport, adults, children, sum_price, total_price, destination)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [duration, hotel, meal, transport, adults, children, sum_price, total_price, destination]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getTrips,
    addTrip,
};
