// client/src/pages/LocationsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStates } from "../services/api";
import USMap from "../components/USMap";


export default function LocationsPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStates()
            .then(setRows)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const stateCounts = useMemo(() => {
        const map = {};
        for (const r of rows) map[String(r.state).toUpperCase()] = r.count || 0;
        return map;
    }, [rows]);

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="hero-overlay">
                    <h2>Find your next event</h2>
                    <p className="muted">
                        Click a state to explore city events, lineups, and details.
                    </p>
                </div>
            </section>

            {/* US section with single background image UNDER both map & tabs */}
            <section className="us-bg-section">
                <div className="us-bg-inner">
                    <h3 className="section-title">United States</h3>

                    {loading ? (
                        <p>Loading map…</p>
                    ) : error ? (
                        <p style={{ color: "tomato" }}>Error: {error}</p>
                    ) : (
                        <>
                            {/* Map sits over the same background */}
                            <div className="map-on-bg">
                                <USMap stateCounts={stateCounts} />
                            </div>

                            <p className="muted legend">Green: has events · Red: no events</p>

                            {/* “State tabs” — still linked cards, now also over the background */}
                            <div className="state-tabs">
                                <div className="grid">
                                    {rows.map(r => (
                                        <Link
                                            key={r.state}
                                            to={`/states/${r.state}`}
                                            className="card link-card"
                                        >
                                            <div className="card-body">
                                                <h4>
                                                    {r.name} ({r.state})
                                                </h4>
                                                <p className="muted">
                                                    {r.count} events · {r.cities.length} cities
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
