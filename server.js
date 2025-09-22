import express from "express";
import path from "path";
import events from "./data/events.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const fmtCurrency = (n) => (Number(n) === 0 ? "Free" : `$${Number(n).toFixed(2)}`);
const fmtDate = (iso) =>
    new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

const page = ({ title, body, description = "" }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
  <style>
    header { margin: 1rem 0 .5rem; }
    .grid { align-items: stretch; }
    .card-img { aspect-ratio: 16/9; object-fit: cover; width: 100%; border-radius: 12px; }
    .chip { font-size:.8rem; padding:.2rem .5rem; border-radius:999px; border:1px solid var(--muted-border-color); display:inline-block; }
    .muted { color: var(--muted-color); }
    .stack > * + * { margin-top:.75rem; }
    .cards > article { height:100%; display:flex; flex-direction:column; transition: transform .15s ease, box-shadow .15s ease; }
    .cards > article:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,.12); }
    .cards .content { flex:1; }
  </style>
</head>
<body>
  <main class="container">
    ${body}
    <footer style="margin:3rem 0 1rem; color:var(--muted-color); font-size:.9rem">
      Built for Week 1 · Listicle · Vanilla HTML/CSS/JS + Express + Pico.css
    </footer>
  </main>
</body>
</html>`;

// Home (list)
app.get("/", (req, res) => {
    const allGenres = [...new Set(events.flatMap(e => e.genre))].sort();

    const filterBar = `
    <form id="filterForm">
      <label for="genre">Filter by genre</label>
      <select id="genre" name="genre">
        <option value="">All</option>
        ${allGenres.map(g => `<option value="${g}">${g}</option>`).join("")}
      </select>
    </form>
    <script>
      const sel = document.getElementById('genre');
      sel.addEventListener('change', () => {
        const value = sel.value;
        document.querySelectorAll('[data-genres]').forEach(card => {
          const genres = card.dataset.genres.split('|');
          card.style.display = !value || genres.includes(value) ? '' : 'none';
        });
      });
    </script>
  `;

    const cards = events.map(e => {
        const genres = e.genre.map(g => `<span class="chip">${g}</span>`).join(" ");
        return `
      <article data-genres="${e.genre.join("|")}">
        <img class="card-img" src="${e.image}" alt="${e.name}">
        <div class="content">
          <h3>${e.name}</h3>
          <p class="muted">${e.venue} · ${fmtDate(e.dateTime)}</p>
          <p>${e.description}</p>
          <p>${genres}</p>
        </div>
        <footer>
          <small>From ${fmtCurrency(e.ticketPrice)}</small>
          <a role="button" href="/events/${e.slug}">View details</a>
        </footer>
      </article>
    `;
    }).join("");

    const body = `
    <header>
      <h1>Discover Local Music</h1>
      <p class="muted">Browse upcoming events in the South Bay.</p>
    </header>
    ${filterBar}
    <section class="grid cards">${cards}</section>
  `;

    res.send(page({ title: "Discover Local Music", body }));
});

// Detail
app.get("/events/:slug", (req, res, next) => {
    const event = events.find(e => e.slug === req.params.slug);
    if (!event) return next();

    const body = `
    <nav class="muted"><a href="/">← All events</a></nav>
    <article class="stack">
      <img class="card-img" src="${event.image}" alt="${event.name}">
      <h1>${event.name}</h1>
      <p><strong>Artists:</strong> ${event.artists.join(", ")}</p>
      <p><strong>Date & Time:</strong> ${fmtDate(event.dateTime)}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
      <p><strong>Genre:</strong> ${event.genre.join(", ")}</p>
      <p><strong>Ticket:</strong> ${fmtCurrency(event.ticketPrice)}</p>
      <p><strong>Description:</strong> ${event.description}</p>
      <details>
        <summary class="muted">Meta</summary>
        <p><strong>ID:</strong> ${event.id}</p>
        <p><strong>Slug:</strong> ${event.slug}</p>
        <p><strong>Submitted By:</strong> ${event.submittedBy}</p>
        <p><strong>Submitted On:</strong> ${event.submittedOn}</p>
      </details>
    </article>
  `;

    res.send(page({ title: event.name, description: event.description, body }));
});

// 404
app.use((req, res) => {
    const body = `
    <section style="text-align:center">
      <img src="/404.svg" alt="Not found" style="max-width:320px;width:100%;margin:1rem auto;"/>
      <h2>404 · Page not found</h2>
      <p class="muted">The page you’re looking for doesn’t exist.</p>
      <p><a href="/">Go home</a></p>
    </section>
  `;
    res.status(404).send(page({ title: "Not found", body }));
});

app.listen(PORT, () => {
    console.log(`✅ Listicle server running at http://localhost:${PORT}`);
});
