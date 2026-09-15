'use client';

import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {CharacterType} from '../../types/api.model';
import {getCharacterType} from '../../utils/characterType';
import {fallbackOnError} from '../../utils/imageUtils';

interface CharacterHeroCardProps {
  character: CharacterType;
  onClick: () => void;
}

// 캐릭터 페이지 그리드와 메인 검색 결과가 함께 쓰는 하스스톤 스타일 카드.
export default function CharacterHeroCard({
  character,
  onClick,
}: CharacterHeroCardProps) {
  const type = getCharacterType(character.affiliation);
  const cardVars = {
    '--accent': type.accent,
    '--accent-soft': type.accentSoft,
    '--bg-from': type.bgFrom,
    '--bg-to': type.bgTo,
  } as React.CSSProperties;

  return (
    <Card className="hero-card" style={cardVars} onClick={onClick}>
      <span
        className="hero-card__type-circle"
        title={type.label}
        aria-label={type.label}>
        {type.icon}
      </span>
      {character.namuwikiUrl && (
        <Badge bg="success" className="hero-card__wiki-badge">
          나무위키
        </Badge>
      )}
      <div className="hero-card__portrait">
        <Image
          src={character.img}
          alt={character.name.korean.name}
          fill
          sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
          onError={fallbackOnError}
        />
      </div>
      <div className="hero-card__shade" />
      <div className="hero-card__name-plate">
        <div className="hero-card__name">{character.name.korean.name}</div>
        <div className="hero-card__type-label">{type.label}</div>
      </div>
    </Card>
  );
}
