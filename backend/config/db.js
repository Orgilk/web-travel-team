const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'travel',
    password: 'Password1',
    port: 5432, // Default PostgreSQL port
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Error connecting to PostgreSQL:', err);
});

module.exports = pool;
