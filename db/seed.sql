-- db/seed.sql
-- 10 green US states (have events): CA, NY, TX, WA, FL, IL, CO, GA, MA, AZ
-- Extra countries for world map: Canada (CA), India (IN), Australia (AU), South Africa (ZA)
-- All others red (no events)

INSERT INTO events
  (slug, name, artists, starts_at, venue, city, state, country, genre, price, image, description, submitted_by)
VALUES
-- ===== CALIFORNIA (CA) =====
('ca-san-jose-synthwave-2025-10-09','San Jose Synthwave','Neon Coast','2025-10-09 19:30:00','SAP Center','San Jose','CA','US','Electronic, Synthwave',22,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Retro synths with analog visuals.','seed'),
('ca-oakland-groove-2025-10-12','Oakland Groove Night','DJ Amber','2025-10-12 20:00:00','The New Parish','Oakland','CA','US','Funk, Soul',15,
'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1600&auto=format&fit=crop','Funky grooves and dance vibes.','seed'),

-- ===== NEW YORK (NY) =====
('ny-newyork-jazz-2025-10-18','NYC Jazz Evening','The Blue Notes','2025-10-18 20:00:00','Blue Note','New York','NY','US','Jazz',25,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Live jazz in Manhattan.','seed'),
('ny-brooklyn-beats-2025-10-19','Brooklyn Beats','SoundLab Crew','2025-10-19 21:00:00','House of Yes','Brooklyn','NY','US','Electronic',30,
'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1600&auto=format&fit=crop','Deep house and techno.','seed'),

-- ===== TEXAS (TX) =====
('tx-austin-live-2025-10-20','Austin Live Music','Lone Star Band','2025-10-20 19:00:00','Stubb''s BBQ','Austin','TX','US','Rock',20,
'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1600&auto=format&fit=crop','Texas rock and BBQ.','seed'),
('tx-houston-harmony-2025-10-25','Houston Harmony','SoulTribe','2025-10-25 20:00:00','Continental Club','Houston','TX','US','Soul',18,
'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1600&auto=format&fit=crop','Soulful night in Houston.','seed'),

-- ===== WASHINGTON (WA) =====
('wa-seattle-synth-2025-10-16','Seattle Synth Wave','Neon Coast','2025-10-16 20:00:00','The Crocodile','Seattle','WA','US','Electronic, Synthwave',22,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Retro synths + analog visuals.','seed'),

-- ===== FLORIDA (FL) =====
('fl-miami-house-2025-10-17','Miami Sunset House','DJ Palms','2025-10-17 19:30:00','The Wharf','Miami','FL','US','House',24,
'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop','Open-air house by the water.','seed'),

-- ===== ILLINOIS (IL) =====
('il-chicago-house-2025-10-15','Chicago House Night','Warehouse 312','2025-10-15 21:00:00','Smartbar','Chicago','IL','US','House',22,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Classic Chicago house.','seed'),

-- ===== COLORADO (CO) =====
('co-denver-edm-2025-10-16','Denver EDM Underground','Waveform 92','2025-10-16 22:00:00','The Black Box','Denver','CO','US','EDM',20,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Bass-forward club night.','seed'),

-- ===== GEORGIA (GA) =====
('ga-atlanta-hiphop-2025-10-17','Atlanta Hip-Hop','Southside Cypher','2025-10-17 21:00:00','The Masquerade','Atlanta','GA','US','Hip-Hop',19,
'https://images.unsplash.com/photo-1526476148966-98bd039463ea?q=80&w=1600&auto=format&fit=crop','Local MCs + beatmakers.','seed'),

-- ===== MASSACHUSETTS (MA) =====
('ma-boston-classical-2025-10-15','Boston Classics','Back Bay Philharmonic','2025-10-15 19:30:00','Symphony Hall','Boston','MA','US','Classical',30,
'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop','Romantics and film suites.','seed'),

-- ===== ARIZONA (AZ) =====
('az-phoenix-edm-2025-10-16','Phoenix Night Bass','Desert Bass','2025-10-16 22:00:00','Crescent Ballroom','Phoenix','AZ','US','EDM',20,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Low-end under neon.','seed'),

-- ===== CANADA (CA) =====
('ca-toronto-pop-2025-10-15','Toronto Pop Fest','Maple Beats','2025-10-15 20:00:00','Danforth Music Hall','Toronto',NULL,'CA','Pop',20,
'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600&auto=format&fit=crop','Canadian pop showcase.','seed'),
('ca-vancouver-rock-2025-10-18','Vancouver Rock Night','North Shore','2025-10-18 19:00:00','Commodore Ballroom','Vancouver',NULL,'CA','Rock',22,
'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1600&auto=format&fit=crop','West coast rock evening.','seed'),

-- ===== INDIA (IN) =====
('in-mumbai-fusion-2025-10-21','Mumbai Fusion Beats','DesiGroove','2025-10-21 19:30:00','Blue Frog','Mumbai',NULL,'IN','Fusion, World',18,
'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600&auto=format&fit=crop','Bollywood + electro mix.','seed'),
('in-bangalore-techno-2025-10-23','Bangalore Techno','Circuit Tribe','2025-10-23 21:00:00','Pebble','Bangalore',NULL,'IN','Techno',16,
'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop','Underground vibes.','seed'),

-- ===== AUSTRALIA (AU) =====
('au-sydney-jazz-2025-10-19','Sydney Jazz Lounge','Coastal Trio','2025-10-19 20:00:00','The Basement','Sydney',NULL,'AU','Jazz',25,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Smooth jazz near the harbor.','seed'),
('au-melbourne-electro-2025-10-22','Melbourne Electro Night','WaveLine','2025-10-22 21:00:00','170 Russell','Melbourne',NULL,'AU','Electronic',22,
'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1600&auto=format&fit=crop','Aussie electro fusion.','seed'),

-- ===== SOUTH AFRICA (ZA) =====
('za-cape-town-jazz-2025-10-18','Cape Town Jazz','Table Bay Trio','2025-10-18 19:00:00','The Crypt','Cape Town',NULL,'ZA','Jazz',20,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Jazz under Table Mountain.','seed'),
('za-johannesburg-afrobeats-2025-10-21','Jozi Afrobeats Night','ZuluSound','2025-10-21 20:30:00','Great Dane','Johannesburg',NULL,'ZA','Afrobeats',18,
'https://images.unsplash.com/photo-1526476148966-98bd039463ea?q=80&w=1600&auto=format&fit=crop','Afrobeats & dancehall mix.','seed')

ON CONFLICT (slug) DO NOTHING;
