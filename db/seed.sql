-- db/seed.sql
-- 10 green states (have events): CA, NY, TX, WA, FL, IL, CO, GA, MA, AZ
-- 20+ red states (no events): all others (we insert nothing for them)
-- Requires: events table with columns including "state" (TEXT) and unique "slug"

INSERT INTO events
  (slug, name, artists, starts_at, venue, city, state, genre, price, image, description, submitted_by)
VALUES
-- ===== CALIFORNIA (CA) =====
('ca-san-jose-synthwave-2025-10-09','San Jose Synthwave','Neon Coast','2025-10-09 19:30:00','SAP Center','San Jose','CA','Electronic, Synthwave',22,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Retro synths with analog visuals.','seed'),
('ca-oakland-groove-2025-10-12','Oakland Groove Night','DJ Amber','2025-10-12 20:00:00','The New Parish','Oakland','CA','Funk, Soul',15,
'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1600&auto=format&fit=crop','Funky grooves and dance vibes.','seed'),
('ca-san-francisco-trance-2025-10-10','SF Trance Harbor','Neon Vale','2025-10-10 20:30:00','Pier 30','San Francisco','CA','EDM, Trance',28,
'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop','Harbor lights + big-room trance.','seed'),
('ca-berkeley-folk-2025-10-13','Berkeley Folk Fest','Hills & Hollows','2025-10-13 17:00:00','Civic Center Park','Berkeley','CA','Folk, Bluegrass',15,
'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop','Picnic blankets and harmonies.','seed'),

-- ===== NEW YORK (NY) =====
('ny-newyork-jazz-2025-10-18','NYC Jazz Evening','The Blue Notes','2025-10-18 20:00:00','Blue Note','New York','NY','Jazz',25,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Live jazz in Manhattan.','seed'),
('ny-brooklyn-beats-2025-10-19','Brooklyn Beats','SoundLab Crew','2025-10-19 21:00:00','House of Yes','Brooklyn','NY','Electronic',30,
'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1600&auto=format&fit=crop','Deep house and techno.','seed'),
('ny-buffalo-indie-2025-10-15','Buffalo Indie Night','Lake Effect','2025-10-15 20:00:00','Town Ballroom','Buffalo','NY','Indie',16,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop','DIY guitars and hooks.','seed'),
('ny-rochester-lofi-2025-10-22','Rochester Lo-Fi','Tape Loop','2025-10-22 19:30:00','Anthology','Rochester','NY','Lo-Fi, Chillhop',12,
'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop','Cozy beats + visuals.','seed'),

-- ===== TEXAS (TX) =====
('tx-austin-live-2025-10-20','Austin Live Music','Lone Star Band','2025-10-20 19:00:00','Stubb''s BBQ','Austin','TX','Rock',20,
'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1600&auto=format&fit=crop','Texas rock and BBQ.','seed'),
('tx-houston-soul-2025-10-25','Houston Harmony','SoulTribe','2025-10-25 20:00:00','Continental Club','Houston','TX','Soul',18,
'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1600&auto=format&fit=crop','A soulful night in Midtown.','seed'),
('tx-dallas-hiphop-2025-10-23','Dallas Hip-Hop Night','Metro MCs','2025-10-23 21:00:00','Trees','Dallas','TX','Hip-Hop',19,
'https://images.unsplash.com/photo-1526476148966-98bd039463ea?q=80&w=1600&auto=format&fit=crop','Local MCs and beat sets.','seed'),
('tx-sanantonio-cumbia-2025-10-18','San Antonio Cumbia','La Rumba','2025-10-18 19:30:00','Paper Tiger','San Antonio','TX','Cumbia, Latin',14,
'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600&auto=format&fit=crop','Dance-forward tropical night.','seed'),

-- ===== WASHINGTON (WA) =====
('wa-seattle-synth-2025-10-16','Seattle Synth Wave','Neon Coast','2025-10-16 20:00:00','The Crocodile','Seattle','WA','Electronic, Synthwave',22,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Retro synths + analog visuals.','seed'),
('wa-seattle-jazz-2025-10-19','Seattle Jazz & Brews','Soundview Trio','2025-10-19 19:00:00','Jazz Alley','Seattle','WA','Jazz',28,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Standards and originals.','seed'),
('wa-tacoma-indie-2025-10-21','Tacoma Indie Night','Harbour Lights','2025-10-21 20:00:00','Alma','Tacoma','WA','Indie',18,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop','DIY indie showcase.','seed'),
('wa-bellingham-lofi-2025-10-25','Bellingham Lo-Fi','Tape Loop','2025-10-25 19:30:00','Wild Buffalo','Bellingham','WA','Lo-Fi',10,
'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop','Cozy beats and visuals.','seed'),

-- ===== FLORIDA (FL) =====
('fl-miami-house-2025-10-17','Miami Sunset House','DJ Palms','2025-10-17 19:30:00','The Wharf','Miami','FL','House',24,
'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop','Open-air house by the water.','seed'),
('fl-orlando-pop-2025-10-18','Orlando Pop Live','Citrus Sky','2025-10-18 19:00:00','The Social','Orlando','FL','Pop',16,
'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600&auto=format&fit=crop','Shiny hooks and sing-alongs.','seed'),
('fl-tampa-ska-2025-10-20','Tampa Ska Revival','Brass Route','2025-10-20 20:00:00','The Orpheum','Tampa','FL','Ska',15,
'https://images.unsplash.com/photo-1526476148966-98bd039463ea?q=80&w=1600&auto=format&fit=crop','Upstrokes and horns.','seed'),
('fl-jacksonville-blues-2025-10-22','Jacksonville Blues','River Delta','2025-10-22 20:00:00','1904 Music Hall','Jacksonville','FL','Blues',18,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Classic blues night.','seed'),

-- ===== ILLINOIS (IL) =====
('il-chicago-house-2025-10-15','Chicago House Night','Warehouse 312','2025-10-15 21:00:00','Smartbar','Chicago','IL','House',22,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Classic Chicago house.','seed'),
('il-chicago-jazz-2025-10-19','Chicago Jazz Standards','Lakefront Trio','2025-10-19 19:30:00','Green Mill','Chicago','IL','Jazz',26,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Swing night at the Mill.','seed'),
('il-evanston-indie-2025-10-21','Evanston Indie','North Shore','2025-10-21 20:00:00','SPACE','Evanston','IL','Indie',17,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop','Guitars and harmonies.','seed'),
('il-rockford-metal-2025-10-25','Rockford Metal','Iron Flight','2025-10-25 20:00:00','Tetto Rooftop','Rockford','IL','Metal',20,
'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1600&auto=format&fit=crop','Heavy riffs downtown.','seed'),

-- ===== COLORADO (CO) =====
('co-denver-edm-2025-10-16','Denver EDM Underground','Waveform 92','2025-10-16 22:00:00','The Black Box','Denver','CO','EDM',20,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Bass-forward club night.','seed'),
('co-boulder-acoustic-2025-10-18','Boulder Acoustic','Flatiron Folk','2025-10-18 18:30:00','Fox Theatre','Boulder','CO','Acoustic',12,
'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop','Campfire harmonies indoors.','seed'),
('co-fortcollins-alt-2025-10-20','Fort Collins Alt','Horsetooth','2025-10-20 20:00:00','Aggie Theatre','Fort Collins','CO','Alt Rock',16,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop','Crunchy guitars, big hooks.','seed'),
('co-coloradosprings-pop-2025-10-22','Springs Pop Night','PikeView','2025-10-22 19:00:00','Stargazers','Colorado Springs','CO','Pop',14,
'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600&auto=format&fit=crop','Feel-good pop evening.','seed'),

-- ===== GEORGIA (GA) =====
('ga-atlanta-hiphop-2025-10-17','Atlanta Hip-Hop','Southside Cypher','2025-10-17 21:00:00','The Masquerade','Atlanta','GA','Hip-Hop',19,
'https://images.unsplash.com/photo-1526476148966-98bd039463ea?q=80&w=1600&auto=format&fit=crop','Local MCs + beatmakers.','seed'),
('ga-savannah-jazz-2025-10-19','Savannah Jazz','Bay Quartet','2025-10-19 19:00:00','Victory North','Savannah','GA','Jazz',24,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Standards on the coast.','seed'),
('ga-athens-indie-2025-10-21','Athens Indie','Bulldog Blvd','2025-10-21 20:00:00','40 Watt Club','Athens','GA','Indie',16,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop','College-town guitars.','seed'),
('ga-augusta-blues-2025-10-23','Augusta Blues','Savannah Rail','2025-10-23 20:00:00','Bell Auditorium','Augusta','GA','Blues',18,
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop','Electric blues night.','seed'),

-- ===== MASSACHUSETTS (MA) =====
('ma-boston-classical-2025-10-15','Boston Classics','Back Bay Philharmonic','2025-10-15 19:30:00','Symphony Hall','Boston','MA','Classical',30,
'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop','Romantics and film suites.','seed'),
('ma-cambridge-indie-2025-10-18','Cambridge Indie','River Run','2025-10-18 20:00:00','The Sinclair','Cambridge','MA','Indie',17,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop','Hooks and harmonies.','seed'),
('ma-worcester-metal-2025-10-21','Worcester Metal','Forge','2025-10-21 20:00:00','Palladium','Worcester','MA','Metal',20,
'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1600&auto=format&fit=crop','Heavy riffs eastbound.','seed'),
('ma-salem-ambient-2025-10-25','Salem Ambient','Night Bloom','2025-10-25 19:30:00','Salem Common','Salem','MA','Ambient',12,
'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop','Slow-bloom synthscapes.','seed'),

-- ===== ARIZONA (AZ) =====
('az-phoenix-edm-2025-10-16','Phoenix Night Bass','Desert Bass','2025-10-16 22:00:00','Crescent Ballroom','Phoenix','AZ','EDM',20,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop','Low-end under neon.','seed'),
('az-tempe-pop-2025-10-18','Tempe Pop Live','Sun Devils','2025-10-18 19:00:00','Marquee Theatre','Tempe','AZ','Pop',14,
'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600&auto=format&fit=crop','Feel-good choruses.','seed'),
('az-tucson-folk-2025-10-20','Tucson Folk Circle','Saguaro String Band','2025-10-20 18:30:00','Rialto Theatre','Tucson','AZ','Folk',12,
'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop','Harmonies at dusk.','seed'),
('az-flagstaff-indie-2025-10-22','Flagstaff Indie','Pine Line','2025-10-22 20:00:00','Orpheum Theater','Flagstaff','AZ','Indie',16,
'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop','Guitars in the pines.','seed');

-- Ensure idempotency when reseeding
ON CONFLICT (slug) DO NOTHING;
