const fmtCurrency = (n) =>
    n == null ? '—' : Number(n) === 0 ? 'Free' : `$${Number(n).toFixed(2)}`;
const fmtDateTime = (iso) => (iso ? new Date(iso).toLocaleString() : 'TBA');

module.exports = { fmtCurrency, fmtDateTime };
