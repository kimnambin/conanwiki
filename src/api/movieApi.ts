import axios from 'axios';
import {MovieType} from '../types/api.model';

const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;

const axiosInstance = axios.create({
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const Movie = async (): Promise<MovieType[]> => {
  const {data} = await axiosInstance.get(
    'https://api.themoviedb.org/3/collection/39199?page=1&language=ko-kr',
  );
  return data.parts;
};

export const MovieDetail = async (
  id: number,
): Promise<{results: MovieType[]}> => {
  const {data} = await axiosInstance.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-kr`,
  );
  return data as {results: MovieType[]};
};
