// client/src/pages/CountryDetailPage.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCountry } from "../services/api";

function EventCard({ e }) {
    const starts = e.starts_at ? new Date(e.starts_at) : null;
    const now = new Date();
    const isPast = starts && starts < now;

    return (
        <article className="card">
            {e.image && <img className="card-img" src={e.image} alt={e.name} />}
            <div className="card-body">
                <h4>{e.name}</h4>
                <p className="muted">
                    {[e.venue, e.city, e.state].filter(Boolean).join(", ")}
                    {e.starts_at ? ` · ${new Date(e.starts_at).toLocaleString()}` : ""}
                </p>
                {e.genre && (
                    <p>
                        <small>{e.genre}</small>
                    </p>
                )}
                {e.price != null && (
                    <p>
                        <small>
                            Ticket: {Number(e.price) === 0 ? "Free" : `$${Number(e.price).toFixed(2)}`}
                        </small>
                    </p>
                )}
                {isPast && <p className="eta past">Event passed</p>}
            </div>
        </article>
    );
}

export default function CountryDetailPage() {
    const { code } = useParams(); // e.g. "CA"
    const countryCode = String(code || "").toUpperCase();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Enable country-page background & hide global overlay/header/footer via CSS
    // Enable country-page background & hide global overlay/header/footer via CSS
    useEffect(() => {
        document.body.classList.add("country-active");

        // Also hide the header/footer programmatically just in case
        const header = document.querySelector(".site-header");
        const footer = document.querySelector(".site-footer");
        if (header) header.style.display = "none";
        if (footer) footer.style.display = "none";

        return () => {
            document.body.classList.remove("country-active");
            if (header) header.style.display = "";
            if (footer) footer.style.display = "";
        };
    }, []);


    useEffect(() => {
        setLoading(true);
        fetchCountry(countryCode)
            .then(setData)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [countryCode]);

    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: "tomato" }}>Error: {error}</p>;
    if (!data) return <p>Not found</p>;

    const hasEvents = data.events && data.events.length > 0;

    return (
        <div className="country-page">
            {/* Floating Home Button */}
            <Link to="/" className="home-btn">← Home</Link>

            <main className="inner" style={{ padding: "6rem 3rem" }}>
                <h2 style={{ marginTop: 0 }}>
                    {data.name} ({data.country})
                </h2>

                <p className="muted">
                    {hasEvents
                        ? `${data.events.length} events across ${data.regions.length} regions`
                        : `No events — check back soon!`}
                </p>

                {hasEvents && (
                    <p style={{ margin: "0 0 1rem" }}>
                        {data.regions.map((r) => (
                            <span
                                key={r.name}
                                style={{
                                    display: "inline-block",
                                    margin: "0 .4rem .4rem 0",
                                    padding: ".2rem .5rem",
                                    border: "1px solid rgba(255,255,255,.2)",
                                    borderRadius: "999px",
                                    fontSize: ".85rem",
                                }}
                            >
                                {r.name} · {r.count}
                            </span>
                        ))}
                    </p>
                )}

                {hasEvents ? (
                    <section className="grid">
                        {data.events.map((e) => (
                            <EventCard key={e.id} e={e} />
                        ))}
                    </section>
                ) : (
                    <p style={{ opacity: 0.8 }}>
                        Seed this country by inserting rows in <code>db/seed.sql</code> with{" "}
                        <code>country='{data.country}'</code>.
                    </p>
                )}
            </main>
        </div>
    );
}
