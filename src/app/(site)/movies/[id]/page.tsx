import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Mo_detail from '@/component/movie/Mo_detail';
import {fetchMovies, fetchMoviesSafe, fetchMovieDetail} from '@/api/movieApi';
import {fetchCharacters} from '@/api/keystaticApi';
import {getMovieSeasonMap} from '@/utils/movieOrder';
import {matchLocalCharacters} from '@/utils/movieCast';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieDetailPageProps {
  params: Promise<{id: string}>;
}

// 빌드 타임에 전체 극장판 페이지를 미리 정적 생성한다 (SEO + 성능).
// TMDB 장애로 빌드 자체가 막히지 않도록, 조회 실패 시 사전 생성 없이
// 빌드를 계속 진행한다(해당 페이지는 요청 시점에 렌더링됨).
export async function generateStaticParams() {
  const movies = await fetchMoviesSafe();
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
  const [detail, characters] = await Promise.all([
    fetchMovieDetail(movie.id),
    fetchCharacters(),
  ]);
  const appearingCharacters = matchLocalCharacters(detail.cast, characters);

  const releaseOrdered = [...movies].sort(
    (a, b) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
  );
  const currentIndex = releaseOrdered.findIndex(m => m.id === movie.id);
  const prevMovie = currentIndex > 0 ? releaseOrdered[currentIndex - 1] : null;
  const nextMovie =
    currentIndex >= 0 && currentIndex < releaseOrdered.length - 1
      ? releaseOrdered[currentIndex + 1]
      : null;

  return (
    <Mo_detail
      title={movie.title}
      originalTitle={movie.original_title}
      releaseDate={movie.release_date}
      voteAverage={movie.vote_average}
      voteCount={movie.vote_count}
      popularity={movie.popularity}
      overview={movie.overview}
      posterPath={movie.poster_path}
      backdropPath={movie.backdrop_path}
      season={seasonMap.get(movie.id)}
      runtime={detail.runtime}
      tagline={detail.tagline}
      genres={detail.genres}
      director={detail.director}
      certification={detail.certification}
      watchProviders={detail.watchProviders}
      watchLink={detail.watchLink}
      videos={detail.videos}
      appearingCharacters={appearingCharacters}
      prevMovie={
        prevMovie
          ? {
              id: prevMovie.id,
              title: prevMovie.title,
              posterPath: prevMovie.poster_path,
              season: seasonMap.get(prevMovie.id),
            }
          : null
      }
      nextMovie={
        nextMovie
          ? {
              id: nextMovie.id,
              title: nextMovie.title,
              posterPath: nextMovie.poster_path,
              season: seasonMap.get(nextMovie.id),
            }
          : null
      }
    />
  );
}
