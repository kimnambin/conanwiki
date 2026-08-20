import {MovieType} from '../types/api.model';

// TMDB 공식 영화 장르 id -> 한글명. 거의 바뀌지 않는 고정 목록이라 정적으로 둔다.
// (https://api.themoviedb.org/3/genre/movie/list?language=ko-kr)
export const MOVIE_GENRES: Record<number, string> = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};

export function getGenreName(id: number): string {
  return MOVIE_GENRES[id] ?? '기타';
}

// 목록에 실제로 등장하는 장르만 필터 옵션으로 노출한다.
export function getAvailableGenres(
  movies: MovieType[],
): {id: number; name: string}[] {
  const ids = new Set<number>();
  movies.forEach(m => (m.genre_ids ?? []).forEach(id => ids.add(id)));
  return [...ids]
    .map(id => ({id, name: getGenreName(id)}))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
}
