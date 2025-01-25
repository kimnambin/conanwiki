import {MovieType} from '../types/api';

const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;

export const Movie = async (): Promise<MovieType[]> => {
  const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const res = await fetch(
    'https://api.themoviedb.org/3/collection/39199?page=1&language=ko-kr',
    option,
  );

  if (!res.ok) {
    throw new Error('에러');
  }

  const data = await res.json();
  // console.log('API_KEY:', API_KEY);
  // console.log(data.parts);
  return data.parts;
};

export const MovieDetail = async (
  id: number,
): Promise<{results: MovieType[]}> => {
  const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-kr`,
    option,
  );

  if (!res.ok) {
    throw new Error('에러');
  }

  const data = await res.json();

  return data as {results: MovieType[]};
};
