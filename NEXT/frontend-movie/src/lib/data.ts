import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mockMovies, mockSeries } from "@/lib/mock-data";
import type { Movie, Series } from "@/lib/types";

export async function getMovies(): Promise<Movie[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("created_at", { ascending: false })


    if (error || !data || data.length === 0) {
      return mockMovies;
    }
    return data as Movie[];
  } catch {
    return mockMovies;
  }
}

export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("id", id)
      .single()


    if (error || !data) {
      return mockMovies.find((m) => m.id === id) ?? null;
    }
    return data as Movie;
  } catch {
    return mockMovies.find((m) => m.id === id) ?? null;
  }
}

export async function getSeries(): Promise<Series[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("series")
      .select("*")
      .order("created_at", { ascending: false })


    if (error || !data || data.length === 0) {
      return mockSeries;
    }
    return data as Series[];
  } catch {
    return mockSeries;
  }
}

export async function getSeriesById(id: string): Promise<Series | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("series")
      .select("*")
      .eq("id", id)
      .single()


    if (error || !data) {
      return mockSeries.find((s) => s.id === id) ?? null;
    }
    return data as Series;
  } catch {
    return mockSeries.find((s) => s.id === id) ?? null;
  }
}

export async function getFeaturedMovies(limit = 4): Promise<Movie[]> {
  const all = await getMovies();
  return all.slice(0, limit);
}

export async function getFeaturedSeries(limit = 4): Promise<Series[]> {
  const all = await getSeries();
  return all.slice(0, limit);
}
