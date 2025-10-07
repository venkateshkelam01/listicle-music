const pool = require('../../../db/pool');

async function getAllEvents(req, res, next) {
    try {
        const { q, city, state, country } = req.query;
        const params = [];
        const where = [];

        if (q) {
            params.push(`%${q}%`);
            where.push(
                `(slug ILIKE $${params.length} OR name ILIKE $${params.length} OR artists ILIKE $${params.length} OR venue ILIKE $${params.length} OR city ILIKE $${params.length} OR genre ILIKE $${params.length})`
            );
        }
        if (city) {
            params.push(city);
            where.push(`COALESCE(city, 'Unknown') = $${params.length}`);
        }
        if (state) {
            params.push(state.toUpperCase());
            where.push(`UPPER(COALESCE(state, '')) = $${params.length}`);
        }
        if (country) {
            params.push(country.toUpperCase());
            where.push(`UPPER(COALESCE(country, '')) = $${params.length}`);
        }

        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
        const { rows } = await pool.query(
            `SELECT * FROM events ${whereSql} ORDER BY starts_at NULLS LAST, name ASC`,
            params
        );

        res.json(rows);
    } catch (err) {
        next(err);
    }
}

async function getEventBySlug(req, res, next) {
    try {
        const { rows } = await pool.query('SELECT * FROM events WHERE slug = $1', [req.params.slug]);
        if (!rows[0]) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
}

module.exports = { getAllEvents, getEventBySlug };
