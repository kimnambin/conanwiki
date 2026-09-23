import SearchBar from '@/component/app/SearchBar';
import Home from '@/component/Home';
import {fetchMovies} from '@/api/movieApi';
import {fetchCharacters} from '@/api/keystaticApi';

export default async function HomePage() {
  const [characters, movies] = await Promise.all([
    fetchCharacters(),
    fetchMovies(),
  ]);

  return (
    <>
      <SearchBar characters={characters} movies={movies} />
      <Home />
    </>
  );
}
