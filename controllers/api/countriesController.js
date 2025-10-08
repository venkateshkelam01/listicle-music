const pool = require('../../db/pool');
const { countryName } = require('../../utils/nameMaps');

// Returns list of countries with counts and a simple regions array (unique states/cities)
async function getCountries(req, res, next) {
    try {
        const { rows } = await pool.query(
            `SELECT country, COUNT(*) AS count, ARRAY_AGG(DISTINCT state) AS regions
             FROM events
             WHERE country IS NOT NULL
             GROUP BY country
             ORDER BY COUNT(*) DESC`
        );

        const out = rows.map(r => ({
            country: r.country,
            name: countryName(r.country),
            count: Number(r.count || 0),
            regions: (r.regions || []).filter(Boolean)
        }));

        res.json(out);
    } catch (err) {
        next(err);
    }
}

async function getCountryDetails(req, res, next) {
    try {
        const code = (req.params.code || '').toUpperCase();

        const eventsRes = await pool.query(
            "SELECT * FROM events WHERE UPPER(COALESCE(country, '')) = $1 ORDER BY starts_at NULLS LAST",
            [code]
        );

        // aggregate by state for regions
        const regionsMap = new Map();
        for (const e of eventsRes.rows) {
            const key = e.state || 'Unknown';
            regionsMap.set(key, (regionsMap.get(key) || 0) + 1);
        }

        const regions = Array.from(regionsMap.entries()).map(([name, count]) => ({ name, count }));

        res.json({
            country: code,
            name: countryName(code),
            regions,
            events: eventsRes.rows,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getCountries, getCountryDetails };
