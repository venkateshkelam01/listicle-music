// client/src/pages/LocationsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries } from "../services/api";
import WorldImageHero from "../components/WorldImageHero";

/** Simple bucket: continents → region key */
function bucketForCountry(code) {
    const c = String(code || "").toUpperCase();
    const AMERICAS = new Set(["US", "CA", "MX", "AR", "BR", "CL", "CO", "PE", "EC", "BO", "UY", "PY", "VE", "SR", "GY", "GF", "BZ", "GT", "SV", "HN", "NI", "CR", "PA", "CU", "DO", "HT", "JM", "BS", "TT", "BB"]);
    const AFRICA = new Set(["EG", "MA", "DZ", "TN", "LY", "ZA", "NG", "GH", "KE", "ET", "SN", "TZ", "MZ", "AO", "CM", "CI", "UG", "SD", "RW", "SO", "BF", "NE", "ML", "GM", "MR", "DJ", "ER", "SS", "BI", "LS", "SZ", "NA", "BW", "ZM", "ZW", "GA", "CG", "CD"]);
    const ASIA = new Set(["TR", "RU", "KZ", "GE", "AM", "AZ", "SA", "AE", "QA", "OM", "IR", "IQ", "JO", "LB", "SY", "IL", "IN", "PK", "BD", "LK", "NP", "CN", "JP", "KR", "TW", "HK", "SG", "TH", "VN", "MY", "KH", "LA", "PH", "ID", "MM", "MN"]);
    const AUSTRAL = new Set(["AU", "NZ", "PG", "FJ", "WS", "TO", "SB", "VU", "NC"]);

    if (AMERICAS.has(c)) return "americas";
    if (AFRICA.has(c)) return "africa";
    if (ASIA.has(c)) return "asia";
    if (AUSTRAL.has(c)) return "australia";
    // default by longitude-ish
    return "asia";
}

export default function LocationsPage() {
    const [rows, setRows] = useState([]);
    const [region, setRegion] = useState(""); // '', 'americas', 'africa', 'asia', 'australia'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCountries()
            .then(setRows)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const countryCounts = useMemo(() => {
        const map = {};
        for (const r of rows) map[String(r.country).toUpperCase()] = r.count || 0;
        return map;
    }, [rows]);

    const filtered = useMemo(() => {
        if (!region) return rows;
        return rows.filter((r) => bucketForCountry(r.country) === region);
    }, [rows, region]);

    return (
        <>
            <WorldImageHero onRegionSelect={setRegion} />

            <section className="us-bg-section">
                <div className="us-bg-inner">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <h3 className="section-title" style={{ margin: 0 }}>
                            {region ? `Browse: ${region[0].toUpperCase() + region.slice(1)}` : "Browse Countries"}
                        </h3>
                        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                            <button className={`btn ${region === "" ? "active" : ""}`} onClick={() => setRegion("")}>All</button>
                            <button className={`btn ${region === "americas" ? "active" : ""}`} onClick={() => setRegion("americas")}>Americas</button>
                            <button className={`btn ${region === "africa" ? "active" : ""}`} onClick={() => setRegion("africa")}>Africa</button>
                            <button className={`btn ${region === "asia" ? "active" : ""}`} onClick={() => setRegion("asia")}>Asia</button>
                            <button className={`btn ${region === "australia" ? "active" : ""}`} onClick={() => setRegion("australia")}>Australia</button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading countries…</p>
                    ) : error ? (
                        <p style={{ color: "tomato" }}>Error: {error}</p>
                    ) : (
                        <div className="grid state-tabs" style={{ marginTop: '1rem' }}>
                            {filtered.map((r) => (
                                <Link key={r.country} to={`/countries/${r.country}`} className="card link-card">
                                    <div className="card-body">
                                        <h4>{r.name} ({r.country})</h4>
                                        <p className="muted">{r.count} events · {r.regions.length} regions</p>
                                    </div>
                                </Link>
                            ))}
                            {filtered.length === 0 && (
                                <p className="muted" style={{ marginTop: '1rem' }}>No countries in this region yet. Seed some events!</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
