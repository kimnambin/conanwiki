import SearchBar from '../component/app/SearchBar';
import Home from '../component/Home';
import {fetchMovies} from '../api/movieApi';
import personData from '../data/person.json';
import {CharacherType} from '../types/api.model';

export default async function HomePage() {
  const characters = personData as unknown as CharacherType[];
  const movies = await fetchMovies();

  return (
    <>
      <SearchBar characters={characters} movies={movies} />
      <Home />
    </>
  );
}
