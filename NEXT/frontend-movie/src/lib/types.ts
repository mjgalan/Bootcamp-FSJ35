export type Movie = {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  release_year: number | null;
  duration_minutes: number | null;
  rating: number | null;
  genre: string[] | null;
  created_at: string;
};

export type Series = {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  release_year: number | null;
  seasons: number | null;
  episodes: number | null;
  rating: number | null;
  genre: string[] | null;
  created_at: string;
};

export type Favorite = {
  id: string;
  user_id: string | null;
  movie_id: string | null;
  series_id: string | null;
  created_at: string;
};
