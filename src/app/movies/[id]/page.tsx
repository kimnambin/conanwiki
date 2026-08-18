import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Mo_detail from '../../../component/movie/Mo_detail';
import {fetchMovies, fetchMovieDetail} from '../../../api/movieApi';
import {getMovieSeasonMap} from '../../../utils/movieOrder';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieDetailPageProps {
  params: Promise<{id: string}>;
}

// 빌드 타임에 전체 극장판 페이지를 미리 정적 생성한다 (SEO + 성능).
export async function generateStaticParams() {
  const movies = await fetchMovies();
  return movies.map(movie => ({id: String(movie.id)}));
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const {id} = await params;
  const movies = await fetchMovies();
  const movie = movies.find(m => String(m.id) === id);

  if (!movie) {
    return {title: '극장판을 찾을 수 없어요'};
  }

  return {
    title: movie.title,
    description: movie.overview || `${movie.title} 정보를 확인해보세요.`,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.poster_path
        ? [`${IMAGE_BASE_URL}${movie.poster_path}`]
        : undefined,
    },
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const {id} = await params;
  const movies = await fetchMovies();
  const movie = movies.find(m => String(m.id) === id);

  if (!movie) {
    notFound();
  }

  const seasonMap = getMovieSeasonMap(movies);
  const detail = await fetchMovieDetail(movie.id);

  return (
    <Mo_detail
      title={movie.title}
      releaseDate={movie.release_date}
      voteAverage={movie.vote_average}
      popularity={movie.popularity}
      overview={movie.overview}
      posterPath={movie.poster_path}
      season={seasonMap.get(movie.id)}
      videos={detail.results ?? []}
    />
  );
}
