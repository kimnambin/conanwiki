'use client';

import Link from 'next/link';
import Image from 'next/image';
import {SpecialType} from '../../types/api.model';
import {SPECIAL_CATEGORY_ICON} from '../../utils/specialCategory';
import {SPECIAL_THEME} from '../../utils/specialTheme';

interface SpecialHeroCardProps {
  special: SpecialType;
}

// 콜라보/TV 스페셜/총집편 목록이 쓰는 하스스톤 스타일 포스터 카드.
// 극장판 카드(MovieHeroCard)와 같은 레이아웃이며, 평점 대신 분류를 뱃지로 보여준다.
export default function SpecialHeroCard({special}: SpecialHeroCardProps) {
  const cardVars = {
    '--accent': SPECIAL_THEME.accent,
    '--accent-soft': SPECIAL_THEME.accentSoft,
    '--bg-from': SPECIAL_THEME.bgFrom,
    '--bg-to': SPECIAL_THEME.bgTo,
  } as React.CSSProperties;

  const [primaryCategory] = special.categories;
  const year = special.releaseDate.slice(0, 4);

  return (
    <Link href={`/specials/${special.slug}`} className="text-decoration-none">
      <div className="hero-card hero-card--poster" style={cardVars}>
        <span
          className="hero-card__badge"
          title={special.categories.join(' · ')}>
          {SPECIAL_CATEGORY_ICON[primaryCategory]} {primaryCategory}
        </span>
        <div className="hero-card__portrait">
          <Image
            src={special.poster}
            alt={special.title}
            fill
            sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
          />
        </div>
        <div className="hero-card__shade" />
        <div className="hero-card__name-plate">
          <div className="hero-card__name-row">
            <span className="hero-card__season-chip">{year}</span>
            <div className="hero-card__name">{special.title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
