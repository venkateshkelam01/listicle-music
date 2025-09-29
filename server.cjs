// import express from "express";
// import path from "path";
// import fs from "fs";
// import events from "./data/events.js";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "public")));

// const tmpl = (name) => fs.readFileSync(path.join(__dirname, "views", name), "utf8");
// const layoutTmpl = tmpl("layout.html");
// const homeTmpl = tmpl("home.html");
// const detailTmpl = tmpl("detail.html");

// // super-lightweight string renderer: {{key}} replacements
// function render(html, data = {}) {
//     return html.replace(/\{\{(\w+)\}\}/g, (_, key) => (data[key] ?? ""));
// }

// // NOTE: now supports pageStyles for per-page CSS injection
// const page = ({ title, description = "", body, pageStyles = "" }) =>
//     render(layoutTmpl, { title, description, body, pageStyles });

// const fmtCurrency = (n) => (Number(n) === 0 ? "Free" : `$${Number(n).toFixed(2)}`);
// const fmtDate = (iso) =>
//     new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

// // Home
// app.get("/", (_req, res) => {
//     const allGenres = [...new Set(events.flatMap((e) => e.genre))].sort();
//     const genreOptions = allGenres.map((g) => `<option value="${g}">${g}</option>`).join("");

//     const cards = events
//         .map((e) => {
//             const genres = e.genre.map((g) => `<span class="chip">${g}</span>`).join(" ");
//             return `
//       <article data-genres="${e.genre.join("|")}">
//         <img class="card-img" src="${e.image}" alt="${e.name}">
//         <div class="content">
//           <h3>${e.name}</h3>
//           <p class="muted">${e.venue} · ${fmtDate(e.dateTime)}</p>
//           <p>${e.description}</p>
//           <p>${genres}</p>
//         </div>
//         <footer>
//           <small>From ${fmtCurrency(e.ticketPrice)}</small>
//           <a role="button" class="btn-elevated primary" href="/events/${e.slug}">View details</a>
//         </footer>
//       </article>`;
//         })
//         .join("");

//     const body = render(homeTmpl, { genreOptions, cards });

//     res.send(
//         page({
//             title: "SoundScout: Local Live Music",
//             body,
//             pageStyles: '<link rel="stylesheet" href="/css/home.css">'
//         })
//     );
// });

// // Detail
// app.get("/events/:slug", (req, res, next) => {
//     const ev = events.find((e) => e.slug === req.params.slug);
//     if (!ev) return next();

//     const body = render(detailTmpl, {
//         image: ev.image,
//         name: ev.name,
//         artists: ev.artists.join(", "),
//         dateTime: fmtDate(ev.dateTime),
//         venue: ev.venue,
//         genre: ev.genre.join(", "),
//         ticket: fmtCurrency(ev.ticketPrice),
//         description: ev.description,
//         id: ev.id,
//         slug: ev.slug,
//         submittedBy: ev.submittedBy,
//         submittedOn: ev.submittedOn
//     });

//     res.send(
//         page({
//             title: ev.name,
//             description: ev.description,
//             body,
//             pageStyles: '<link rel="stylesheet" href="/css/detail.css">'
//         })
//     );
// });

// // 404
// app.use((_req, res) => {
//     const body = `
//     <section style="text-align:center">
//       <img src="/404.svg" alt="Not found" style="max-width:320px;width:100%;margin:1rem auto;"/>
    
//       <p><a href="/" class="btn-elevated">Go home</a></p>
//     </section>`;
//     res.status(404).send(
//         page({
//             title: "Not found",
//             body,
//             pageStyles: '<link rel="stylesheet" href="/css/base.css">' 
//         })
//     );
// });

// app.listen(PORT, () => {
//     console.log(`✅ Listicle server running at http://localhost:${PORT}`);
// });


// server.cjs
const path = require('path');
const fs = require('fs');
const express = require('express');
require('dotenv').config();
const pool = require('./db/pool');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// --- Minimal templating: replaces {{key}} with values ---
function render(filePath, data = {}) {
    let html = fs.readFileSync(filePath, 'utf8');
    for (const [k, v] of Object.entries(data)) {
        html = html.replaceAll(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), v ?? '');
    }
    return html;
}

// --- Wrap a view with the layout and allow per-page CSS injection ---
function withLayout({ title, description = '', body, pageStyles = '' }) {
    const layoutPath = path.join(__dirname, 'views', 'layout.html');
    return render(layoutPath, { title, description, body, pageStyles });
}

// Helpers
const fmtCurrency = (n) =>
    n == null ? '—' : Number(n) === 0 ? 'Free' : `$${Number(n).toFixed(2)}`;
const fmtDateTime = (iso) =>
    iso ? new Date(iso).toLocaleString() : 'TBA';

// Home (list) with optional ?q= search (server-side)
// Client-side genre filter (select#genre) uses data-genres on cards.
app.get(['/', '/events'], async (req, res, next) => {
    try {
        const { q } = req.query;

        // Build search WHERE clause
        const params = [];
        const where = [];
        if (q) {
            params.push(`%${q}%`);
            where.push(
                `(slug ILIKE $${params.length} OR name ILIKE $${params.length} OR artists ILIKE $${params.length} OR venue ILIKE $${params.length} OR city ILIKE $${params.length} OR genre ILIKE $${params.length})`
            );
        }
        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

        // Query rows to display
        const { rows } = await pool.query(
            `SELECT * FROM events ${whereSql} ORDER BY starts_at NULLS LAST, name ASC`,
            params
        );

        // Build genre options from ALL rows in the table (so dropdown is stable regardless of q)
        const allGenreRows = await pool.query('SELECT genre FROM events WHERE genre IS NOT NULL');
        const allGenres = [
            ...new Set(
                allGenreRows.rows
                    .flatMap(r => (r.genre || '').split(',').map(s => s.trim()))
                    .filter(Boolean)
            ),
        ].sort();

        const genreOptions = allGenres
            .map(g => `<option value="${g}">${g}</option>`)
            .join('');

        // Build cards markup that matches your CSS selectors
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

        // Render home view
        const homePath = path.join(__dirname, 'views', 'home.html');
        let body = render(homePath, {
            list: cards,
            genreOptions, // used by the <select> in home.html
        });

        // Attach lightweight client-side genre filter (show/hide cards)
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

        // Send with page-specific CSS so grid = 3 per row etc.
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

// Detail page (keys must match views/detail.html placeholders)
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

// JSON API
app.get('/api/events', async (req, res, next) => {
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
// 404 handler (for both HTML and JSON requests)
app.use((req, res) => {
    const wantsJson = req.path.startsWith('/api') || (req.accepts('json') && !req.accepts('html'));
    const isAsset = Boolean(path.extname(req.path)); // e.g. .png, .css, .js

    if (wantsJson) {
        return res.status(404).json({ error: 'Not found' });
    }

    if (isAsset) {
        // Missing images/CSS/JS should be a bare 404 so they don't render as overlays
        return res.sendStatus(404);
    }

    // Pretty HTML 404 for page routes
    const layoutPath = path.join(__dirname, 'views', 'layout.html');
    // If you have withLayout(), you can use it; otherwise inline render:
    const body = `
    <section style="text-align:center">
      <img src="/404.svg" alt="Not found" style="max-width:320px;width:100%;margin:1rem auto;"/>
      <p><a href="/" class="btn-elevated">Go home</a></p>
    </section>
  `;

    // If you already have withLayout({ title, body, pageStyles }), use that:
    // return res.status(404).send(withLayout({ title: 'Not found', body }));

    // Minimal render using your existing render() helper:
    const html = (function render(filePath, data = {}) {
        let html = require('fs').readFileSync(filePath, 'utf8');
        for (const [k, v] of Object.entries(data)) {
            html = html.replaceAll(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), v ?? '');
        }
        return html;
    })(layoutPath, { title: 'Not found', description: '', body, pageStyles: '' });

    return res.status(404).send(html);
});

// Error handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).send('<pre>Server error. Check logs.</pre>');
});

app.listen(PORT, () => console.log(`✓ http://localhost:${PORT}`));
