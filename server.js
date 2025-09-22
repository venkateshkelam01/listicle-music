import express from "express";
import path from "path";
import fs from "fs";
import events from "./data/events.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const tmpl = (name) => fs.readFileSync(path.join(__dirname, "views", name), "utf8");
const layoutTmpl = tmpl("layout.html");
const homeTmpl = tmpl("home.html");
const detailTmpl = tmpl("detail.html");

// super-lightweight string renderer: {{key}} replacements
function render(html, data = {}) {
    return html.replace(/\{\{(\w+)\}\}/g, (_, key) => (data[key] ?? ""));
}
const page = ({ title, description = "", body }) =>
    render(layoutTmpl, { title, description, body });

const fmtCurrency = (n) => (Number(n) === 0 ? "Free" : `$${Number(n).toFixed(2)}`);
const fmtDate = (iso) =>
    new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

// Home
app.get("/", (_req, res) => {
    const allGenres = [...new Set(events.flatMap((e) => e.genre))].sort();
    const genreOptions = allGenres.map((g) => `<option value="${g}">${g}</option>`).join("");

    const cards = events.map((e) => {
        const genres = e.genre.map((g) => `<span class="chip">${g}</span>`).join(" ");
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
      </article>`;
    }).join("");

    const body = render(homeTmpl, { genreOptions, cards });
    res.send(page({ title: "Discover Local Music", body }));
});

// Detail
app.get("/events/:slug", (req, res, next) => {
    const ev = events.find((e) => e.slug === req.params.slug);
    if (!ev) return next();

    const body = render(detailTmpl, {
        image: ev.image,
        name: ev.name,
        artists: ev.artists.join(", "),
        dateTime: fmtDate(ev.dateTime),
        venue: ev.venue,
        genre: ev.genre.join(", "),
        ticket: fmtCurrency(ev.ticketPrice),
        description: ev.description,
        id: ev.id,
        slug: ev.slug,
        submittedBy: ev.submittedBy,
        submittedOn: ev.submittedOn
    });

    res.send(page({ title: ev.name, description: ev.description, body }));
});

// 404
app.use((_req, res) => {
    const body = `
    <section style="text-align:center">
      <img src="/404.svg" alt="Not found" style="max-width:320px;width:100%;margin:1rem auto;"/>
      <h2>404 · Page not found</h2>
      <p class="muted">The page you’re looking for doesn’t exist.</p>
      <p><a href="/">Go home</a></p>
    </section>`;
    res.status(404).send(page({ title: "Not found", body }));
});

app.listen(PORT, () => {
    console.log(`✅ Listicle server running at http://localhost:${PORT}`);
});
