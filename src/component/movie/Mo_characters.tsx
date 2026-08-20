'use client';

import {useState} from 'react';
import {CharacherType} from '../../types/api.model';
import CharacterHeroCard from '../character/CharacterHeroCard';
import Ch_detail from '../character/Ch_detail';
import '../common/HeroCard.css';
import './Mo_detail.css';

interface Mo_charactersProps {
  characters: CharacherType[];
}

// 극장판 상세 페이지의 "등장하는 캐릭터" 섹션. 캐릭터 페이지와 동일한
// CharacterHeroCard/Ch_detail을 재사용해 클릭하면 같은 상세 팝업이 뜬다.
export default function Mo_characters({characters}: Mo_charactersProps) {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState<CharacherType | null>(null);

  if (characters.length === 0) return null;

  const openDetail = (character: CharacherType) => {
    setSelect(character);
    setOpen(true);
  };

  const close = () => {
    setSelect(null);
    setOpen(false);
  };

  return (
    <div className="mo-detail__section">
      <span className="mo-detail__section-title">👤 등장하는 캐릭터</span>
      <Ch_detail open={open} close={close} character={select} />
      <div className="mo-detail__character-grid">
        {characters.map(character => (
          <CharacterHeroCard
            key={character.name.english.anime}
            character={character}
            onClick={() => openDetail(character)}
          />
        ))}
      </div>
    </div>
  );
}
