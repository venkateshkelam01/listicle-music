CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  artists TEXT,
  starts_at TIMESTAMP,
  venue TEXT,
  city TEXT,
  genre TEXT,
  price NUMERIC,
  image TEXT,
  description TEXT,
  submitted_by TEXT,
  submitted_on DATE DEFAULT CURRENT_DATE
);
