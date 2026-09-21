import {createReader} from '@keystatic/core/reader';
import SearchBar from '@/component/app/SearchBar';
import Home from '@/component/Home';
import {fetchMovies} from '@/api/movieApi';
import keystaticConfig from '../../../keystatic.config';
import {CharacterType} from '@/types/api.model';

export default async function HomePage() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const [charEntries, movies] = await Promise.all([
    reader.collections.characters.all(),
    fetchMovies(),
  ]);

  const characters = charEntries.map(c => c.entry) as unknown as CharacterType[];

  return (
    <>
      <SearchBar characters={characters} movies={movies} />
      <Home />
    </>
  );
}
