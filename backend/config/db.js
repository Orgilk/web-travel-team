const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'travel',
    password: 'Password1',
    port: 5432, 
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Error connecting to PostgreSQL:', err);
});

module.exports = pool;
