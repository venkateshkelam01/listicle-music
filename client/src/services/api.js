// client/src/services/api.js
const API = import.meta.env.VITE_API_BASE || '';

export async function fetchLocations() {
    const res = await fetch(`${API}/api/locations`);
    if (!res.ok) throw new Error('Failed to load locations');
    return res.json();
}

export async function fetchLocation(slug) {
    const res = await fetch(`${API}/api/locations/${slug}`);
    if (!res.ok) throw new Error('Location not found');
    return res.json();
}

export async function fetchEventsByCity(city) {
    const params = new URLSearchParams({ city });
    const res = await fetch(`${API}/api/events?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load events');
    return res.json();
}

// ===== States (US) =====
export async function fetchStates() {
    const res = await fetch(`${API}/api/states`);
    if (!res.ok) throw new Error('Failed to load states');
    return res.json();
}

export async function fetchState(code) {
    const res = await fetch(`${API}/api/states/${code}`);
    if (!res.ok) throw new Error('State not found');
    return res.json();
}

// ===== Countries (World)  ***************
export async function fetchCountries() {
    const res = await fetch(`${API}/api/countries`);
    if (!res.ok) throw new Error('Failed to load countries');
    return res.json();
}

export async function fetchCountry(code) {
    const res = await fetch(`${API}/api/countries/${code}`);
    if (!res.ok) throw new Error('Country not found');
    return res.json();
}
