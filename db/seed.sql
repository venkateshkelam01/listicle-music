-- db/seed.sql

INSERT INTO events
(slug, name, artists, starts_at, venue, city, state, genre, price, image, description)
VALUES
-- California events
('san-jose-festival', 'San Jose Music Festival', 'Bay Beats', '2025-10-09 18:30:00', 'SAP Center', 'San Jose', 'CA', 'Pop', 20,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop',
'A full-day festival featuring emerging California artists.'),
('oakland-groove', 'Oakland Groove Night', 'DJ Amber', '2025-10-12 20:00:00', 'The New Parish', 'Oakland', 'CA', 'Funk, Soul', 15,
'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1200&auto=format&fit=crop',
'Funky grooves and local dance vibes in Oakland.'),

-- New York events
('nyc-jazz-evening', 'NYC Jazz Evening', 'The Blue Notes', '2025-10-18 20:00:00', 'Blue Note Jazz Club', 'New York', 'NY', 'Jazz', 25,
'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop',
'Live jazz night in downtown Manhattan.'),
('brooklyn-beats', 'Brooklyn Beats', 'SoundLab Crew', '2025-10-19 21:00:00', 'House of Yes', 'Brooklyn', 'NY', 'Electronic', 30,
'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1200&auto=format&fit=crop',
'A night of deep house and techno in Brooklyn.'),

-- Texas events
('austin-live', 'Austin Live Music', 'Lone Star Band', '2025-10-20 19:00:00', 'Stubbs BBQ', 'Austin', 'TX', 'Rock', 20,
'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop',
'Texas rock and BBQ — nothing better!'),
('houston-harmony', 'Houston Harmony', 'SoulTribe', '2025-10-25 20:00:00', 'The Continental Club', 'Houston', 'TX', 'Soul', 18,
'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1200&auto=format&fit=crop',
'A soulful night in Houston.');

-- Run in psql: \i db/schema.sql then \i db/seed.sql
