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
  try {
    const {data} = await axiosInstance.get(
      'https://api.themoviedb.org/3/collection/39199?page=1&language=ko-kr',
    );
    return data.parts;
  } catch (error) {
    throw new Error('에러');
  }
};

export const MovieDetail = async (
  id: number,
): Promise<{results: MovieType[]}> => {
  try {
    const {data} = await axiosInstance.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-kr`,
    );
    return data as {results: MovieType[]};
  } catch (error) {
    throw new Error('에러');
  }
};
