import type {Metadata} from 'next';
import CharacterBrowser from '@/component/character/CharacterBrowser';
import {fetchCharacters, fetchCouples} from '@/api/keystaticApi';

export const metadata: Metadata = {
  title: '등장인물',
  description:
    '명탐정 코난 등장인물과 커플 정보를 소속/타입별로 모아봤어요. 코난, 하이바라 아이, 모리 란 등 주요 캐릭터를 검색하고 필터링할 수 있어요.',
};

export default async function CharactersPage() {
  const [characters, couples] = await Promise.all([
    fetchCharacters(),
    fetchCouples(),
  ]);

  return <CharacterBrowser characters={characters} couples={couples} />;
}
