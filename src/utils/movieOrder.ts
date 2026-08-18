import {MovieType} from '../types/api.model';

// 개봉일 기준으로 정렬해 각 극장판이 몇 번째(=몇 기)인지 매핑한다.
// 정렬 옵션(개봉순/평점순/인기순)과 무관하게 항상 개봉 순서를 기준으로 계산한다.
export function getMovieSeasonMap(
  movieList: MovieType[],
): Map<number, number> {
  const sorted = [...movieList].sort(
    (a, b) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
  );
  const map = new Map<number, number>();
  sorted.forEach((movie, idx) => map.set(movie.id, idx + 1));
  return map;
}
