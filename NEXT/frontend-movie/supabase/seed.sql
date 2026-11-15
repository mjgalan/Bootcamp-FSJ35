-- ============================================================
-- Frontend Movie - Datos de ejemplo (seed)
-- Ejecutar después de schema.sql
-- ============================================================

insert into public.movies (title, description, poster_url, backdrop_url, release_year, duration_minutes, rating, genre) values
('El Último Horizonte', 'Un astronauta solitario descubre un secreto que podría cambiar el destino de la humanidad.', 'https://picsum.photos/seed/movie1/400/600', 'https://picsum.photos/seed/movie1b/1200/600', 2024, 142, 8.4, array['Ciencia ficción','Drama']),
('Sombras de la Ciudad', 'Un detective persigue a un asesino en serie a través de las calles lluviosas de una metrópoli.', 'https://picsum.photos/seed/movie2/400/600', 'https://picsum.photos/seed/movie2b/1200/600', 2023, 118, 7.9, array['Thriller','Crimen']),
('Risas en Verano', 'Un grupo de amigos revive su infancia durante unas vacaciones inolvidables.', 'https://picsum.photos/seed/movie3/400/600', 'https://picsum.photos/seed/movie3b/1200/600', 2022, 95, 7.2, array['Comedia','Romance']),
('El Reino Perdido', 'Una joven guerrera debe reclamar el trono usurpado por un tirano oscuro.', 'https://picsum.photos/seed/movie4/400/600', 'https://picsum.photos/seed/movie4b/1200/600', 2024, 156, 8.7, array['Fantasía','Aventura']);

insert into public.series (title, description, poster_url, backdrop_url, release_year, seasons, episodes, rating, genre) values
('Crónicas del Futuro', 'Una saga épica sobre el colapso y renacimiento de la civilización.', 'https://picsum.photos/seed/series1/400/600', 'https://picsum.photos/seed/series1b/1200/600', 2023, 3, 24, 8.9, array['Ciencia ficción','Drama']),
('Misterios sin Resolver', 'Casos reales que desafían la lógica y la justicia.', 'https://picsum.photos/seed/series2/400/600', 'https://picsum.photos/seed/series2b/1200/600', 2022, 2, 16, 8.2, array['Documental','Misterio']),
('La Familia Real', 'Intrigas y secretos dentro de una dinastía ficticia.', 'https://picsum.photos/seed/series3/400/600', 'https://picsum.photos/seed/series3b/1200/600', 2024, 1, 8, 7.7, array['Drama','Histórico']);
