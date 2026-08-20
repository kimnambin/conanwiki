import 'server-only';
import {MovieDetailInfo, MovieType} from '../types/api.model';

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

interface TmdbMovieDetailResponse {
  runtime: number | null;
  tagline: string;
  genres: {id: number; name: string}[];
  videos: {results: {key: string; name: string; site: string}[]};
  credits: {
    crew: {name: string; job: string}[];
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
  release_dates: {
    results: {
      iso_3166_1: string;
      release_dates: {certification: string}[];
    }[];
  };
  'watch/providers': {
    results: Record<
      string,
      {
        link: string;
        flatrate?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
      }
    >;
  };
}

export const fetchMovieDetail = async (
  id: number,
): Promise<MovieDetailInfo> => {
  const res = await fetch(
    `${TMDB_BASE}/movie/${id}?append_to_response=videos,credits,release_dates,watch/providers&language=ko-kr`,
    {
      headers: tmdbHeaders(),
      next: {revalidate: 3600},
    },
  );
  const data: TmdbMovieDetailResponse = await res.json();

  const director =
    data.credits.crew.find(member => member.job === 'Director')?.name ??
    null;

  const krRelease = data.release_dates.results.find(
    entry => entry.iso_3166_1 === 'KR',
  );
  const certification = krRelease?.release_dates[0]?.certification || null;

  const krProviders = data['watch/providers'].results?.KR;

  return {
    runtime: data.runtime,
    tagline: data.tagline,
    genres: data.genres,
    director,
    cast: data.credits.cast.slice(0, 10),
    certification,
    watchProviders: krProviders?.flatrate ?? [],
    watchLink: krProviders?.link ?? null,
    videos: data.videos.results.filter(v => v.site === 'YouTube'),
  };
};
