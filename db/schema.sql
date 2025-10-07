-- db/schema.sql

DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    artists TEXT,
    starts_at TIMESTAMP,
    venue TEXT,
    city TEXT,
    state TEXT,          
    country TEXT,        
    region TEXT,        
    genre TEXT,
    price NUMERIC(10,2),
    image TEXT,
    description TEXT,
    submitted_by TEXT,
    submitted_on DATE DEFAULT CURRENT_DATE
);
