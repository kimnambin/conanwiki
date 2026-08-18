import Link from 'next/link';
import {MOVIE_THEME} from '../../utils/movieTheme';
import './Mo_detail.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieVideo {
  key: string;
  name: string;
}

interface Mo_detailProps {
  title: string;
  releaseDate: string;
  voteAverage: number;
  popularity: number;
  overview: string;
  posterPath: string;
  season?: number;
  videos: MovieVideo[];
}

// 극장판 상세 페이지. Server Component라 이 화면의 콘텐츠 전체가
// 초기 HTML 응답에 그대로 포함된다 (SEO의 핵심).
export default function Mo_detail({
  title,
  releaseDate,
  voteAverage,
  popularity,
  overview,
  posterPath,
  season,
  videos,
}: Mo_detailProps) {
  const formattedRating = voteAverage.toFixed(1);
  const formattedPopularity = Math.round(popularity);

  const cardVars = {
    '--accent': MOVIE_THEME.accent,
    '--accent-soft': MOVIE_THEME.accentSoft,
    '--bg-from': MOVIE_THEME.bgFrom,
    '--bg-to': MOVIE_THEME.bgTo,
  } as React.CSSProperties;

  return (
    <div className="mo-detail-page" style={cardVars}>
      <Link href="/movies" className="mo-detail__back">
        ← 극장판 목록으로
      </Link>

      <div className="mo-detail__hero">
        <div className="mo-detail__poster">
          <img src={`${IMAGE_BASE_URL}${posterPath}`} alt={title} />
        </div>
        <div className="mo-detail__info">
          <div className="mo-detail__title-row">
            {season && <span className="mo-detail__season">{season}기</span>}
            <h1 className="mo-detail__title">{title}</h1>
          </div>
          <div className="mo-detail__meta">
            <span className="mo-detail__meta-item">📅 {releaseDate}</span>
            <span className="mo-detail__meta-item">⭐ {formattedRating}</span>
            <span className="mo-detail__meta-item">
              🔥 인기도 {formattedPopularity}
            </span>
          </div>
          <p className="mo-detail__overview">{overview}</p>
        </div>
      </div>

      {videos.length > 0 && (
        <div className="mo-detail__trailers">
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
    </div>
  );
}
