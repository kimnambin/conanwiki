import Link from 'next/link';
import Image from 'next/image';
import {CharacterType, SpecialType} from '../../types/api.model';
import {SPECIAL_THEME} from '../../utils/specialTheme';
import Mo_characters from '../movie/Mo_characters';
import '../movie/Mo_detail.css';
import './Sp_detail.css';

interface SpecialNavInfo {
  slug: string;
  title: string;
  poster: string;
}

interface Sp_detailProps {
  special: SpecialType;
  appearingCharacters: CharacterType[];
  prevSpecial: SpecialNavInfo | null;
  nextSpecial: SpecialNavInfo | null;
}

// 콜라보/TV 스페셜/총집편 상세 페이지. 극장판 상세(Mo_detail)와 같은 레이아웃/스타일을 쓰고,
// 정적 데이터(src/data/specials.json)만으로 렌더링하는 Server Component다.
export default function Sp_detail({
  special,
  appearingCharacters,
  prevSpecial,
  nextSpecial,
}: Sp_detailProps) {
  const cardVars = {
    '--accent': SPECIAL_THEME.accent,
    '--accent-soft': SPECIAL_THEME.accentSoft,
    '--bg-from': SPECIAL_THEME.bgFrom,
    '--bg-to': SPECIAL_THEME.bgTo,
  } as React.CSSProperties;

  return (
    <div className="mo-detail-page" style={cardVars}>
      <Link href="/specials" className="mo-detail__back">
        ← 콜라보/스페셜 목록으로
      </Link>

      <div className="mo-detail__hero">
        <div className="mo-detail__poster">
          <Image
            src={special.poster}
            alt={special.title}
            fill
            sizes="(max-width: 576px) 180px, 220px"
            priority
          />
        </div>
        <div className="mo-detail__info">
          <div className="mo-detail__title-row">
            <h1 className="mo-detail__title">{special.title}</h1>
          </div>
          {special.originalTitle && (
            <p className="mo-detail__original-title">
              {special.originalTitle}
            </p>
          )}

          <div className="mo-detail__meta">
            <span className="mo-detail__meta-item">
              📅 일본 공개 {special.releaseDate}
            </span>
            <span className="mo-detail__meta-item">
              ⏱️ {special.runtime}분
            </span>
            {special.certification && (
              <span className="mo-detail__meta-item">
                🔞 {special.certification}
              </span>
            )}
          </div>

          <div className="mo-detail__genres">
            {special.categories.map(category => (
              <span key={category} className="mo-detail__genre-chip">
                {category}
              </span>
            ))}
          </div>

          <p className="mo-detail__director">🎬 감독: {special.director}</p>
          {special.krInfo && (
            <p className="sp-detail__kr">🇰🇷 {special.krInfo}</p>
          )}

          <p className="mo-detail__overview">{special.overview}</p>

          <a
            href={special.namuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sp-detail__namu-link">
            나무위키에서 더 보기 ↗
          </a>
        </div>
      </div>

      <Mo_characters characters={appearingCharacters} />

      {(prevSpecial || nextSpecial) && (
        <div className="mo-detail__nav">
          {prevSpecial ? (
            <Link
              href={`/specials/${prevSpecial.slug}`}
              className="mo-detail__nav-item mo-detail__nav-item--prev">
              <Image src={prevSpecial.poster} alt="" width={44} height={66} />
              <div>
                <div className="mo-detail__nav-label">← 이전 작품</div>
                <div className="mo-detail__nav-title">{prevSpecial.title}</div>
              </div>
            </Link>
          ) : (
            <span />
          )}
          {nextSpecial ? (
            <Link
              href={`/specials/${nextSpecial.slug}`}
              className="mo-detail__nav-item mo-detail__nav-item--next">
              <div>
                <div className="mo-detail__nav-label">다음 작품 →</div>
                <div className="mo-detail__nav-title">{nextSpecial.title}</div>
              </div>
              <Image src={nextSpecial.poster} alt="" width={44} height={66} />
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
