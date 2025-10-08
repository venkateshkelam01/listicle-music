const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function runSQLFile(filePath) {
    const absolutePath = path.join(__dirname, '..', filePath);
    const sql = fs.readFileSync(absolutePath, 'utf8');
    try {
        await pool.query(sql);
        console.log(`✅ Executed ${filePath}`);
    } catch (err) {
        console.error(`❌ Error running ${filePath}`, err);
    }
}

(async () => {
    await runSQLFile('db/schema.sql');
    await runSQLFile('db/seed.sql');
    await pool.end();
})();
