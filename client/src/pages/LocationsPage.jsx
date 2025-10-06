import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLocations } from '../services/api'

export default function LocationsPage() {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchLocations()
            .then(setLocations)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Loading locations…</p>
    if (error) return <p style={{ color: 'tomato' }}>Error: {error}</p>

    return (
        <section className="grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem'
        }}>
            {locations.map(loc => (
                <Link key={loc.slug} to={`/locations/${loc.slug}`} style={{
                    display: 'block',
                    textDecoration: 'none',
                    border: '1px solid #333',
                    padding: '1rem',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ margin: '0 0 .25rem' }}>{loc.name}</h3>
                    <p style={{ opacity: .75, margin: 0 }}>{loc.count} events</p>
                    {loc.next_event && (
                        <small style={{ opacity: .7 }}>
                            Next: {new Date(loc.next_event).toLocaleString()}
                        </small>
                    )}
                </Link>
            ))}
        </section>
    )
}
