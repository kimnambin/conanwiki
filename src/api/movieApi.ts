import 'server-only';
import {MovieType} from '../types/api.model';

const TMDB_BASE = 'https://api.themoviedb.org/3';

function tmdbHeaders() {
  return {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  };
}

export const fetchMovies = async (): Promise<MovieType[]> => {
  const res = await fetch(
    `${TMDB_BASE}/collection/39199?page=1&language=ko-kr`,
    {
      headers: tmdbHeaders(),
      next: {revalidate: 3600},
    },
  );
  const data = await res.json();
  return data.parts;
};

export const fetchMovieDetail = async (
  id: number,
): Promise<{results: {key: string; name: string}[]}> => {
  const res = await fetch(
    `${TMDB_BASE}/movie/${id}/videos?language=ko-kr`,
    {
      headers: tmdbHeaders(),
      next: {revalidate: 3600},
    },
  );
  return res.json();
};
