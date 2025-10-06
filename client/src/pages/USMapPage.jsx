// client/src/pages/USMapPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStates } from "../services/api";
import USMap from "../components/USMap";

export default function USMapPage() {
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

    if (loading) return <p>Loading US map…</p>;
    if (error) return <p style={{ color: 'tomato' }}>Error: {error}</p>;

    return (
        <>
            <h2 style={{ marginTop: 0 }}>US Events Map</h2>
            <p className="muted">Green: has events · Red: no events</p>

            <USMap stateCounts={stateCounts} />

            <h3 style={{ marginTop: '1rem' }}>States</h3>
            <div className="grid">
                {rows.map(r => (
                    <Link key={r.state} to={`/states/${r.state}`} className="card link-card">
                        <div className="card-body">
                            <h4>{r.name} ({r.state})</h4>
                            <p className="muted">{r.count} events · {r.cities.length} cities</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
