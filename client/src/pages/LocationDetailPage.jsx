import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchLocation } from '../services/api'

function EventCard({ e }) {
    const starts = e.starts_at ? new Date(e.starts_at) : null
    const now = new Date()
    const isPast = starts && starts < now
    const etaMs = starts ? (starts - now) : null
    const etaHrs = etaMs != null ? Math.floor(etaMs / 36e5) : null

    return (
        <article style={{
            border: '1px solid #333',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {e.image && <img src={e.image} alt={e.name} style={{ aspectRatio: '16/9', objectFit: 'cover' }} />}
            <div style={{ padding: '1rem' }}>
                <h4 style={{ margin: '0 0 .25rem' }}>{e.name}</h4>
                <p style={{ opacity: .75, margin: 0 }}>
                    {e.venue}{e.city ? `, ${e.city}` : ''}{' '}
                    {e.starts_at ? `· ${new Date(e.starts_at).toLocaleString()}` : ''}
                </p>
                {e.genre && <p style={{ margin: '.5rem 0 0' }}><small>{e.genre}</small></p>}
                {/* Stretch: countdown + passed styling */}
                {starts && (
                    <p style={{ margin: '.5rem 0 0', fontWeight: 600, opacity: isPast ? .6 : 1, textDecoration: isPast ? 'line-through' : 'none' }}>
                        {isPast ? 'Event passed' : `Starts in ~${etaHrs}h`}
                    </p>
                )}
                {e.price != null && <p style={{ margin: '.5rem 0 0' }}><small>Ticket: {Number(e.price) === 0 ? 'Free' : `$${Number(e.price).toFixed(2)}`}</small></p>}
            </div>
        </article>
    )
}

export default function LocationDetailPage() {
    const { slug } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        fetchLocation(slug)
            .then(setData)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [slug])

    if (loading) return <p>Loading…</p>
    if (error) return <p style={{ color: 'tomato' }}>Error: {error}</p>
    if (!data) return <p>Not found.</p>

    return (
        <section>
            <nav style={{ marginBottom: '1rem' }}><Link to="..">← All locations</Link></nav>
            <h2 style={{ marginTop: 0 }}>{data.name}</h2>
            <p style={{ opacity: .7, marginTop: '.25rem' }}>{data.events.length} events</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
            }}>
                {data.events.map(e => <EventCard key={e.id} e={e} />)}
            </div>
        </section>
    )
}
