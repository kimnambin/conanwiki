'use client';

import {CharacterType} from '../../types/api.model';
import {useModal} from '../../hooks/useModal';
import CharacterHeroCard from '../character/CharacterHeroCard';
import Ch_detail from '../character/Ch_detail';
import '../common/HeroCard.css';
import './Mo_detail.css';

interface Mo_charactersProps {
  characters: CharacterType[];
}

// 극장판 상세 페이지의 "등장하는 캐릭터" 섹션. 캐릭터 페이지와 동일한
// CharacterHeroCard/Ch_detail을 재사용해 클릭하면 같은 상세 팝업이 뜬다.
export default function Mo_characters({characters}: Mo_charactersProps) {
  const {isOpen: open, selected: select, open: openDetail, close} = useModal<CharacterType>();

  if (characters.length === 0) return null;

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
