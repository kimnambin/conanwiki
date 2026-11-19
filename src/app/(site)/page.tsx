import SearchBar from '@/component/app/SearchBar';
import Home from '@/component/Home';
import {fetchMoviesSafe} from '@/api/movieApi';
import {fetchCharacters} from '@/api/keystaticApi';
import {CharacterType} from '@/types/api.model';

// 캐릭터(로컬 Keystatic)와 영화(TMDB API) 데이터는 서로 독립적인
// 기능(검색창의 두 섹션)에 쓰인다. 영화 쪽은 fetchMoviesSafe가 이미
// 실패를 흡수하므로, 캐릭터 쪽도 같은 방식으로 흡수해 한쪽이 실패해도
// 다른 쪽과 그 아래 "둘러보기" 영역까지 같이 죽지 않게 한다.
async function fetchCharactersSafe(): Promise<CharacterType[]> {
  return fetchCharacters().catch(error => {
    console.error('fetchCharacters 실패, 빈 목록으로 대체:', error);
    return [];
  });
}

export default async function HomePage() {
  const [characters, movies] = await Promise.all([
    fetchCharactersSafe(),
    fetchMoviesSafe(),
  ]);

  return (
    <>
      <SearchBar characters={characters} movies={movies} />
      <Home />
    </>
  );
}
