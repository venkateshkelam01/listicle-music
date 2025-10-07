// client/src/pages/StateDetailPage.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchState } from "../services/api";


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
                    {[e.venue, e.city].filter(Boolean).join(", ")}
                    {e.starts_at ? ` · ${new Date(e.starts_at).toLocaleString()}` : ""}
                </p>
                {e.genre && <p><small>{e.genre}</small></p>}
                {e.price != null && (
                    <p><small>Ticket: {Number(e.price) === 0 ? 'Free' : `$${Number(e.price).toFixed(2)}`}</small></p>
                )}
                {isPast && <p className="eta past">Event passed</p>}
            </div>
        </article>
    );
}

export default function StateDetailPage() {
    const { code } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchState(code)
            .then(setData)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [code]);

    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: 'tomato' }}>Error: {error}</p>;
    if (!data) return <p>Not found</p>;

    const hasEvents = data.events && data.events.length > 0;

    return (
        <>


            <h2 style={{ marginTop: 0 }}>{data.name} ({data.state})</h2>
            <p className="muted">
                {hasEvents ? `${data.events.length} events across ${data.cities.length} cities`
                    : `No events — check back soon!`}
            </p>

            {hasEvents && (
                <p style={{ margin: '0 0 1rem' }}>
                    {data.cities.map(c => (
                        <span key={c.name} style={{
                            display: 'inline-block', margin: '0 .4rem .4rem 0',
                            padding: '.2rem .5rem', border: '1px solid rgba(255,255,255,.2)',
                            borderRadius: '999px', fontSize: '.85rem'
                        }}>
                            {c.name} · {c.count}
                        </span>
                    ))}
                </p>
            )}

            {hasEvents ? (
                <section className="grid">
                    {data.events.map(e => <EventCard key={e.id} e={e} />)}
                </section>
            ) : (
                <p style={{ opacity: .8 }}>
                    You can seed this state by adding rows in <code>db/seed.sql</code> with <code>state='{data.state}'</code>.
                </p>
            )}
        </>
    );
}
