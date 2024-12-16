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

const getDestinations = async (req, res) => {
    try {
        const { rating, name } = req.query;

        let query = 'SELECT * FROM destinations';
        const queryParams = [];

        // Add WHERE clause for rating
        if (rating) {
            queryParams.push(rating);
            query += ` WHERE rating >= $${queryParams.length}`;
        }

        // Add WHERE clause for name
        if (name) {
            queryParams.push(`%${name}%`);
            query += queryParams.length === 1 
                ? ` WHERE name ILIKE $${queryParams.length}`
                : ` AND name ILIKE $${queryParams.length}`;
        }

        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Add a new trip
const addTrip = async (req, res) => {
    const { duration, hotel, meal, transport, adults, children, sumPrice, totalPrice, destination } = req.body;
    console.log("body: ", req.body)
    try {
        const result = await pool.query(
            `INSERT INTO orders (duration, hotel, meal, transport, adults, children, sum_price, total_price, destination)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [duration, hotel, meal, transport, adults, children, sumPrice, totalPrice, destination]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
// delete trip
const deleteTrip = async (req, res) => {
    const { trip_id } = req.body; // Assuming you are passing the trip ID in the request body
    
    console.log("Deleting trip with ID:", trip_id);

    try {
        // Query to delete the trip with the given ID
        const result = await pool.query(
            `DELETE FROM orders WHERE id = $1 RETURNING *`, // Assuming "id" is the unique column for trip in your "orders" table
            [trip_id]
        );

        // Check if a trip was deleted
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Respond with the deleted trip data (optional)
        res.status(200).json({ message: 'Trip deleted successfully', deletedTrip: result.rows[0] });
    } catch (err) {
        console.error('Error deleting trip:', err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    getTrips,
    getDestinations,
    addTrip,
    deleteTrip
};
