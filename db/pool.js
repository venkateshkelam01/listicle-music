// // db/pool.js
// const { Pool } = require('pg');
// require('dotenv').config();

// const sslNeeded = process.env.PGSSLMODE === 'require';
// module.exports = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: sslNeeded ? { rejectUnauthorized: false } : undefined,
// });


// db/pool.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
