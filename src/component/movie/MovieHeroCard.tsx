'use client';

import Link from 'next/link';
import Image from 'next/image';
import {MovieType} from '../../types/api.model';
import {MOVIE_THEME} from '../../utils/movieTheme';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieHeroCardProps {
  movie: MovieType;
  season?: number;
  rank?: number;
}

// 극장판 목록/메인 검색 결과가 함께 쓰는 하스스톤 스타일 포스터 카드.
export default function MovieHeroCard({
  movie,
  season,
  rank,
}: MovieHeroCardProps) {
  const cardVars = {
    '--accent': MOVIE_THEME.accent,
    '--accent-soft': MOVIE_THEME.accentSoft,
    '--bg-from': MOVIE_THEME.bgFrom,
    '--bg-to': MOVIE_THEME.bgTo,
  } as React.CSSProperties;

  return (
    <Link href={`/movies/${movie.id}`} className="text-decoration-none">
      <div className="hero-card hero-card--poster" style={cardVars}>
        {typeof movie.vote_average === 'number' && (
          <span className="hero-card__badge" title="평점">
            ⭐{movie.vote_average.toFixed(1)}
          </span>
        )}
        {rank && (
          <span className="hero-card__rank-badge" title={`인기 ${rank}위`}>
            🏆{rank}위
          </span>
        )}
        <div className="hero-card__portrait">
          <Image
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
          />
        </div>
        <div className="hero-card__shade" />
        <div className="hero-card__name-plate">
          <div className="hero-card__name-row">
            {season && (
              <span className="hero-card__season-chip">{season}기</span>
            )}
            <div className="hero-card__name">{movie.title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
