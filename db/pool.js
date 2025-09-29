// db/pool.js
const { Pool } = require('pg');
require('dotenv').config();

const sslNeeded = process.env.PGSSLMODE === 'require';
module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: sslNeeded ? { rejectUnauthorized: false } : undefined,
});
