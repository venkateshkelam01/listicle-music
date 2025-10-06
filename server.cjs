// server.cjs
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db/pool');

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================
// Middleware & static assets
// ===========================
app.use(cors()); // allow React client (Vite) to call this API
app.use(express.static(path.join(__dirname, 'public')));

// ===========================
// Utilities
// ===========================
const fmtCurrency = (n) =>
    n == null ? '—' : Number(n) === 0 ? 'Free' : `$${Number(n).toFixed(2)}`;
const fmtDateTime = (iso) => (iso ? new Date(iso).toLocaleString() : 'TBA');

const slugify = (s = '') =>
    String(s)
        .toLowerCase()
        .trim()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

// 2-letter state code -> full name (used by /api/states)
function stateName(code) {
    const map = {
        AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
        CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
        IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
        ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
        MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
        NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
        OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
        TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
        WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming', DC: 'District of Columbia'
    };
    return map[String(code).toUpperCase()] || code;
}

// ===========================
// Minimal templating for SSR
// ===========================
function render(filePath, data = {}) {
    let html = fs.readFileSync(filePath, 'utf8');
    for (const [k, v] of Object.entries(data)) {
        html = html.replaceAll(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), v ?? '');
    }
    return html;
}

function withLayout({ title, description = '', body, pageStyles = '' }) {
    const layoutPath = path.join(__dirname, 'views', 'layout.html');
    return render(layoutPath, { title, description, body, pageStyles });
}

// ===========================
// SSR PAGES (your existing UI)
// ===========================

// Home (list) with optional ?q= search
app.get(['/', '/events'], async (req, res, next) => {
    try {
        const { q } = req.query;

        const params = [];
        const where = [];
        if (q) {
            params.push(`%${q}%`);
            where.push(
                `(slug ILIKE $${params.length} OR name ILIKE $${params.length} OR artists ILIKE $${params.length} OR venue ILIKE $${params.length} OR city ILIKE $${params.length} OR genre ILIKE $${params.length})`
            );
        }
        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

        const { rows } = await pool.query(
            `SELECT * FROM events ${whereSql} ORDER BY starts_at NULLS LAST, name ASC`,
            params
        );

        // Build genre dropdown from entire table (stable set)
        const allGenreRows = await pool.query(
            'SELECT genre FROM events WHERE genre IS NOT NULL'
        );
        const allGenres = [
            ...new Set(
                allGenreRows.rows
                    .flatMap(r => (r.genre || '').split(',').map(s => s.trim()))
                    .filter(Boolean)
            ),
        ].sort();

        const genreOptions = allGenres.map(g => `<option value="${g}">${g}</option>`).join('');

        const cards = rows.map(e => {
            const genresArr = (e.genre || '').split(',').map(s => s.trim()).filter(Boolean);
            const chips = genresArr.map(g => `<span class="chip">${g}</span>`).join(' ');
            const dataGenres = genresArr.join('|');
            const when = fmtDateTime(e.starts_at);
            const price = fmtCurrency(e.price);

            return `
      <article data-genres="${dataGenres}">
        <img class="card-img" src="${e.image || ''}" alt="${e.name}">
        <div class="content">
          <h3>${e.name}</h3>
          <p class="muted">${[e.venue || '', e.city || ''].filter(Boolean).join(', ')}${when !== 'TBA' ? ` · ${when}` : ''}</p>
          <p>${e.description || ''}</p>
          <p>${chips}</p>
        </div>
        <footer>
          <small>From ${price}</small>
          <a role="button" class="btn-elevated primary" href="/events/${e.slug}">View details</a>
        </footer>
      </article>`;
        }).join('');

        const homePath = path.join(__dirname, 'views', 'home.html');
        let body = render(homePath, { list: cards, genreOptions });

        // client-side genre filter
        body += `
<script>
  (function(){
    const sel = document.getElementById('genre');
    if (!sel) return;
    sel.addEventListener('change', () => {
      const val = sel.value.trim();
      document.querySelectorAll('.cards > article').forEach(card => {
        if (!val) { card.style.display = ''; return; }
        const genres = (card.getAttribute('data-genres') || '');
        card.style.display = genres.includes(val) ? '' : 'none';
      });
    });
  })();
</script>`;

        res.send(
            withLayout({
                title: 'SoundScout: Local Live Music',
                description: 'Browse local shows, open mics, DJs, and more.',
                body,
                pageStyles: '<link rel="stylesheet" href="/css/home.css">',
            })
        );
    } catch (err) {
        next(err);
    }
});

// Detail page for a single event
app.get('/events/:slug', async (req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM events WHERE slug = $1', [req.params.slug]);
        const e = rows[0];
        if (!e) return next();

        const detailPath = path.join(__dirname, 'views', 'detail.html');
        const body = render(detailPath, {
            image: e.image || '',
            name: e.name || '',
            artists: e.artists || '—',
            dateTime: fmtDateTime(e.starts_at),
            venue: e.venue || '—',
            genre: e.genre || '—',
            ticket: fmtCurrency(e.price),
            description: e.description || '',
            id: e.id ?? '',
            slug: e.slug || '',
            submittedBy: e.submitted_by || '—',
            submittedOn: e.submitted_on
                ? new Date(e.submitted_on).toISOString().slice(0, 10)
                : '—',
        });

        res.send(
            withLayout({
                title: e.name,
                description: e.description || '',
                body,
                pageStyles: '<link rel="stylesheet" href="/css/detail.css">',
            })
        );
    } catch (err) {
        next(err);
    }
});

// ===========================
// JSON API (for React client)
// ===========================

// EVENTS: supports ?q=, ?city=, ?state=
app.get('/api/events', async (req, res, next) => {
    try {
        const { q, city, state } = req.query;
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
            params.push(String(state).toUpperCase());
            where.push(`UPPER(COALESCE(state, '')) = $${params.length}`);
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
});

app.get('/api/events/:slug', async (req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM events WHERE slug = $1', [req.params.slug]);
        if (!rows[0]) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// LOCATIONS: derived from events.city (no separate locations table required)
app.get('/api/locations', async (_req, res, next) => {
    try {
        const { rows } = await pool.query(`
      SELECT
        COALESCE(city, 'Unknown') AS city,
        COUNT(*) AS event_count,
        MIN(starts_at) FILTER (WHERE starts_at >= NOW()) AS next_event
      FROM events
      GROUP BY city
      ORDER BY city ASC
    `);

        const payload = rows.map(r => ({
            slug: slugify(r.city || 'unknown'),
            name: r.city || 'Unknown',
            city: r.city || 'Unknown',
            count: Number(r.event_count) || 0,
            next_event: r.next_event ? new Date(r.next_event).toISOString() : null,
        }));

        res.json(payload);
    } catch (err) {
        next(err);
    }
});

app.get('/api/locations/:slug', async (req, res, next) => {
    try {
        const { rows: cities } = await pool.query(
            `SELECT DISTINCT COALESCE(city, 'Unknown') AS city FROM events`
        );
        const match = cities.find(c => slugify(c.city) === req.params.slug);
        if (!match) return res.status(404).json({ error: 'Location not found' });

        const cityName = match.city;
        const { rows: events } = await pool.query(
            `SELECT * FROM events WHERE COALESCE(city, 'Unknown') = $1
       ORDER BY starts_at NULLS LAST, name ASC`,
            [cityName]
        );

        res.json({
            slug: slugify(cityName),
            name: cityName,
            events,
        });
    } catch (err) {
        next(err);
    }
});

// STATES (US map): coloring & drill-down

// GET /api/states -> [{ state:'CA', name:'California', count: 7, cities:[...] }]
app.get('/api/states', async (_req, res, next) => {
    try {
        const { rows } = await pool.query(`
      SELECT
        UPPER(state) AS state,
        COUNT(*) AS event_count,
        ARRAY_AGG(DISTINCT COALESCE(city, 'Unknown')) AS cities
      FROM events
      WHERE state IS NOT NULL AND state <> ''
      GROUP BY UPPER(state)
      ORDER BY UPPER(state)
    `);

        const payload = rows.map(r => ({
            state: r.state,
            name: stateName(r.state),
            count: Number(r.event_count) || 0,
            cities: r.cities || []
        }));

        res.json(payload);
    } catch (err) {
        next(err);
    }
});

// GET /api/states/:code -> { state, name, cities:[{name,count}], events:[...] }
app.get('/api/states/:code', async (req, res, next) => {
    try {
        const code = String(req.params.code || '').toUpperCase();
        const { rows: events } = await pool.query(
            `SELECT * FROM events WHERE UPPER(state) = $1 ORDER BY starts_at NULLS LAST, name ASC`,
            [code]
        );

        const byCity = {};
        for (const e of events) {
            const c = e.city || 'Unknown';
            byCity[c] = (byCity[c] || 0) + 1;
        }
        const cities = Object.entries(byCity)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));

        res.json({
            state: code,
            name: stateName(code),
            cities,
            events
        });
    } catch (err) {
        next(err);
    }
});

// ===========================
// 404 + Error handlers
// ===========================
app.use((req, res) => {
    const wantsJson = req.path.startsWith('/api') || (req.accepts('json') && !req.accepts('html'));
    const isAsset = Boolean(path.extname(req.path));

    if (wantsJson) return res.status(404).json({ error: 'Not found' });
    if (isAsset) return res.sendStatus(404);

    const layoutPath = path.join(__dirname, 'views', 'layout.html');
    const body = `
    <section style="text-align:center">
      <img src="/404.svg" alt="Not found" style="max-width:320px;width:100%;margin:1rem auto;"/>
      <p><a href="/" class="btn-elevated">Go home</a></p>
    </section>
  `;

    const html = (function render(filePath, data = {}) {
        let html = require('fs').readFileSync(filePath, 'utf8');
        for (const [k, v] of Object.entries(data)) {
            html = html.replaceAll(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), v ?? '');
        }
        return html;
    })(layoutPath, { title: 'Not found', description: '', body, pageStyles: '' });

    return res.status(404).send(html);
});

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).send('<pre>Server error. Check logs.</pre>');
});

// ===========================
// Start server
// ===========================
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
