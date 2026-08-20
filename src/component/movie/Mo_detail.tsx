import Link from 'next/link';
import Image from 'next/image';
import {CharacherType, MovieProvider} from '../../types/api.model';
import {MOVIE_THEME} from '../../utils/movieTheme';
import Mo_characters from './Mo_characters';
import './Mo_detail.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w92';

interface MovieVideo {
  key: string;
  name: string;
}

interface MovieNavInfo {
  id: number;
  title: string;
  posterPath: string;
  season?: number;
}

interface Mo_detailProps {
  title: string;
  originalTitle?: string;
  releaseDate: string;
  voteAverage: number;
  voteCount?: number;
  popularity: number;
  overview: string;
  posterPath: string;
  backdropPath?: string | null;
  season?: number;
  runtime: number | null;
  tagline: string;
  genres: {id: number; name: string}[];
  director: string | null;
  certification: string | null;
  watchProviders: MovieProvider[];
  watchLink: string | null;
  videos: MovieVideo[];
  appearingCharacters: CharacherType[];
  prevMovie: MovieNavInfo | null;
  nextMovie: MovieNavInfo | null;
}

const formatRuntime = (minutes: number | null): string | null => {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

// 극장판 상세 페이지. Server Component라 이 화면의 콘텐츠 전체가
// 초기 HTML 응답에 그대로 포함된다 (SEO의 핵심).
export default function Mo_detail({
  title,
  originalTitle,
  releaseDate,
  voteAverage,
  voteCount,
  popularity,
  overview,
  posterPath,
  backdropPath,
  season,
  runtime,
  tagline,
  genres,
  director,
  certification,
  watchProviders,
  watchLink,
  videos,
  appearingCharacters,
  prevMovie,
  nextMovie,
}: Mo_detailProps) {
  const formattedRating = voteAverage.toFixed(1);
  const formattedPopularity = Math.round(popularity);
  const formattedRuntime = formatRuntime(runtime);

  const cardVars = {
    '--accent': MOVIE_THEME.accent,
    '--accent-soft': MOVIE_THEME.accentSoft,
    '--bg-from': MOVIE_THEME.bgFrom,
    '--bg-to': MOVIE_THEME.bgTo,
  } as React.CSSProperties;

  return (
    <div className="mo-detail-page" style={cardVars}>
      {backdropPath && (
        <div className="mo-detail__backdrop">
          <Image
            src={`${BACKDROP_BASE_URL}${backdropPath}`}
            alt=""
            fill
            sizes="100vw"
          />
          <div className="mo-detail__backdrop-shade" />
        </div>
      )}

      <Link href="/movies" className="mo-detail__back">
        ← 극장판 목록으로
      </Link>

      <div className="mo-detail__hero">
        <div className="mo-detail__poster">
          <Image
            src={`${IMAGE_BASE_URL}${posterPath}`}
            alt={title}
            fill
            sizes="(max-width: 576px) 180px, 220px"
            priority
          />
        </div>
        <div className="mo-detail__info">
          <div className="mo-detail__title-row">
            {season && <span className="mo-detail__season">{season}기</span>}
            <h1 className="mo-detail__title">{title}</h1>
          </div>
          {originalTitle && originalTitle !== title && (
            <p className="mo-detail__original-title">{originalTitle}</p>
          )}
          {tagline && <p className="mo-detail__tagline">&ldquo;{tagline}&rdquo;</p>}

          <div className="mo-detail__meta">
            <span className="mo-detail__meta-item">📅 {releaseDate}</span>
            <span className="mo-detail__meta-item">
              ⭐ {formattedRating}
              {typeof voteCount === 'number' && ` (${voteCount.toLocaleString()}명 평가)`}
            </span>
            <span className="mo-detail__meta-item">
              🔥 인기도 {formattedPopularity}
            </span>
            {formattedRuntime && (
              <span className="mo-detail__meta-item">⏱️ {formattedRuntime}</span>
            )}
            {certification && (
              <span className="mo-detail__meta-item">🔞 {certification}</span>
            )}
          </div>

          {genres.length > 0 && (
            <div className="mo-detail__genres">
              {genres.map(g => (
                <span key={g.id} className="mo-detail__genre-chip">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {director && (
            <p className="mo-detail__director">🎬 감독: {director}</p>
          )}

          <p className="mo-detail__overview">{overview}</p>

          {watchProviders.length > 0 && (
            <div className="mo-detail__providers">
              <span className="mo-detail__providers-label">시청 가능:</span>
              {watchProviders.map(p => (
                <a
                  key={p.provider_id}
                  href={watchLink ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mo-detail__provider"
                  title={p.provider_name}>
                  <Image
                    src={`${LOGO_BASE_URL}${p.logo_path}`}
                    alt={p.provider_name}
                    width={34}
                    height={34}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <Mo_characters characters={appearingCharacters} />

      {videos.length > 0 && (
        <div className="mo-detail__section">
          <span className="mo-detail__section-title">🎬 예고편</span>
          <div className="mo-detail__trailer-grid">
            {videos.map(video => (
              <div className="mo-detail__trailer" key={video.key}>
                <div className="mo-detail__trailer-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                  />
                </div>
                <div className="mo-detail__trailer-name">{video.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(prevMovie || nextMovie) && (
        <div className="mo-detail__nav">
          {prevMovie ? (
            <Link href={`/movies/${prevMovie.id}`} className="mo-detail__nav-item mo-detail__nav-item--prev">
              <Image
                src={`${IMAGE_BASE_URL}${prevMovie.posterPath}`}
                alt=""
                width={44}
                height={66}
              />
              <div>
                <div className="mo-detail__nav-label">← 이전 극장판</div>
                <div className="mo-detail__nav-title">
                  {prevMovie.season && `${prevMovie.season}기 `}
                  {prevMovie.title}
                </div>
              </div>
            </Link>
          ) : (
            <span />
          )}
          {nextMovie ? (
            <Link href={`/movies/${nextMovie.id}`} className="mo-detail__nav-item mo-detail__nav-item--next">
              <div>
                <div className="mo-detail__nav-label">다음 극장판 →</div>
                <div className="mo-detail__nav-title">
                  {nextMovie.season && `${nextMovie.season}기 `}
                  {nextMovie.title}
                </div>
              </div>
              <Image
                src={`${IMAGE_BASE_URL}${nextMovie.posterPath}`}
                alt=""
                width={44}
                height={66}
              />
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
