const path = require('path');
const pool = require('../../db/pool');
const { render, withLayout } = require('../../utils/helpers');
const { fmtCurrency, fmtDateTime } = require('../../utils/formatters');

async function renderHomePage(req, res, next) {
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

        const genreRows = await pool.query('SELECT genre FROM events WHERE genre IS NOT NULL');
        const allGenres = [
            ...new Set(
                genreRows.rows.flatMap(r => (r.genre || '').split(',').map(s => s.trim())).filter(Boolean)
            ),
        ].sort();

        const genreOptions = allGenres.map(g => `<option value="${g}">${g}</option>`).join('');
        const cards = rows.map(e => {
            const genresArr = (e.genre || '').split(',').map(g => g.trim()).filter(Boolean);
            const chips = genresArr.map(g => `<span class="chip">${g}</span>`).join(' ');
            const when = fmtDateTime(e.starts_at);
            const price = fmtCurrency(e.price);
            return `
<article data-genres="${genresArr.join('|')}">
  <img class="card-img" src="${e.image || ''}" alt="${e.name}">
  <div class="content">
    <h3>${e.name}</h3>
    <p class="muted">${[e.venue, e.city].filter(Boolean).join(', ')} · ${when}</p>
    <p>${e.description || ''}</p>
    <p>${chips}</p>
  </div>
  <footer>
    <small>From ${price}</small>
    <a role="button" class="btn-elevated primary" href="/events/${e.slug}">View details</a>
  </footer>
</article>`;
        }).join('');

        const body = render(path.join(__dirname, '../../../views/home.html'), {
            list: cards,
            genreOptions
        });

        res.send(
            withLayout({
                title: 'SoundScout: Local Live Music',
                description: 'Browse local shows, open mics, DJs, and more.',
                body: body + `<script>/* genre filter logic */</script>`,
                pageStyles: '<link rel="stylesheet" href="/css/home.css">',
            })
        );
    } catch (err) {
        next(err);
    }
}

async function renderEventDetail(req, res, next) {
    try {
        const { rows } = await pool.query('SELECT * FROM events WHERE slug = $1', [req.params.slug]);
        const e = rows[0];
        if (!e) return next();

        const body = render(path.join(__dirname, '../../../views/detail.html'), {
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
            submittedOn: e.submitted_on ? new Date(e.submitted_on).toISOString().slice(0, 10) : '—',
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
}

module.exports = { renderHomePage, renderEventDetail };
