import type {Metadata} from 'next';
import {createReader} from '@keystatic/core/reader';
import CharacterBrowser from '@/component/character/CharacterBrowser';
import keystaticConfig from '../../../../keystatic.config';
import {CharacterType, CoupleType} from '@/types/api.model';

export const metadata: Metadata = {
  title: '등장인물',
  description:
    '명탐정 코난 등장인물과 커플 정보를 소속/타입별로 모아봤어요. 코난, 하이바라 아이, 모리 란 등 주요 캐릭터를 검색하고 필터링할 수 있어요.',
};

export default async function CharactersPage() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const [charEntries, coupleEntries] = await Promise.all([
    reader.collections.characters.all(),
    reader.collections.couples.all(),
  ]);

  const characters = charEntries.map(c => c.entry) as unknown as CharacterType[];
  const couples = coupleEntries.map(c => c.entry) as unknown as CoupleType[];

  return <CharacterBrowser characters={characters} couples={couples} />;
}
