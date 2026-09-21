import type {Metadata} from 'next';
import MovieBrowser from '../../component/movie/MovieBrowser';
import {fetchMovies} from '../../api/movieApi';

export const metadata: Metadata = {
  title: '극장판',
  description:
    '명탐정 코난 극장판 전체 목록을 개봉순, 평점순, 인기순으로 살펴보세요. 몇 기 극장판인지, 상위 인기 순위까지 한눈에 확인할 수 있어요.',
};

export default async function MoviesPage() {
  const movies = await fetchMovies();

  return <MovieBrowser movies={movies} />;
}
