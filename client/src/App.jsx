// client/src/App.jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="app-wrap">
      <header className="site-header">
        <div className="inner">
          <h1>Virtual Community Space</h1>
          <p className="muted">Explore events by location — city or state</p>
          <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="home-btn-main">Home</Link>

          </nav>
        </div>
      </header>

      <main className="inner">
        <Outlet />
      </main>

      <footer className="site-footer inner">
        Week 3 · React + Express + Postgres
      </footer>
    </div>
  );
}
